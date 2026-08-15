const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();

    const db = client.db('matrimonyDB');
    const usersCollection = db.collection('users');
    const biodatasCollection = db.collection('biodatas');
    const favouritesCollection = db.collection('favourites');
    const contactRequestsCollection = db.collection('contactRequests');
    const paymentsCollection = db.collection('payments');
    const successStoriesCollection = db.collection('successStories');
    const premiumRequestsCollection = db.collection('premiumRequests');

    // ==================== JWT ====================
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
      res.send({ token });
    });

    // Verify Token Middleware
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized access' });
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'Unauthorized access' });
        }
        req.decoded = decoded;
        next();
      });
    };

    // Verify Admin Middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await usersCollection.findOne({ email });
      if (!user || user.role !== 'admin') {
        return res.status(403).send({ message: 'Forbidden access' });
      }
      next();
    };

    // ==================== USERS ====================
    app.post('/users', async (req, res) => {
      const user = req.body;
      const existingUser = await usersCollection.findOne({ email: user.email });
      if (existingUser) {
        return res.send({ message: 'User already exists', insertedId: null });
      }
      const result = await usersCollection.insertOne({
        ...user,
        role: 'user',
        isPremium: false,
        createdAt: new Date()
      });
      res.send(result);
    });

    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const search = req.query.search || '';
      let query = {};
      if (search) {
        query = { name: { $regex: search, $options: 'i' } };
      }
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'Forbidden access' });
      }
      const user = await usersCollection.findOne({ email });
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    });

    app.get('/users/premium/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'Forbidden access' });
      }
      const user = await usersCollection.findOne({ email });
      let premium = false;
      if (user) {
        premium = user?.isPremium === true;
      }
      res.send({ premium });
    });

    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: 'admin' } }
      );
      res.send(result);
    });

    app.patch('/users/premium/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { isPremium: true } }
      );
      // Also update biodata if exists
      if (user) {
        await biodatasCollection.updateOne(
          { contactEmail: user.email },
          { $set: { isPremium: true } }
        );
      }
      res.send(result);
    });

    // ==================== BIODATAS ====================
    app.get('/biodatas', async (req, res) => {
      const { biodataType, division, ageMin, ageMax, sort, page, limit } = req.query;
      let query = {};

      if (biodataType) query.biodataType = biodataType;
      if (division) query.permanentDivision = division;
      if (ageMin || ageMax) {
        query.age = {};
        if (ageMin) query.age.$gte = parseInt(ageMin);
        if (ageMax) query.age.$lte = parseInt(ageMax);
      }

      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 20;
      const skip = (pageNum - 1) * limitNum;

      const sortOrder = sort === 'asc' ? 1 : -1;

      const total = await biodatasCollection.countDocuments(query);
      const result = await biodatasCollection.find(query)
        .sort({ age: sortOrder })
        .skip(skip)
        .limit(limitNum)
        .toArray();

      res.send({ biodatas: result, total, page: pageNum, totalPages: Math.ceil(total / limitNum) });
    });

    app.get('/biodatas/premium', async (req, res) => {
      const result = await biodatasCollection.find({ isPremium: true }).limit(6).toArray();
      res.send(result);
    });

    app.get('/biodatas/count', async (req, res) => {
      const total = await biodatasCollection.countDocuments();
      const male = await biodatasCollection.countDocuments({ biodataType: 'Male' });
      const female = await biodatasCollection.countDocuments({ biodataType: 'Female' });
      const premium = await biodatasCollection.countDocuments({ isPremium: true });
      const marriages = await successStoriesCollection.countDocuments();
      res.send({ total, male, female, premium, marriages });
    });

    app.get('/biodatas/:id', async (req, res) => {
      const id = parseInt(req.params.id);
      const result = await biodatasCollection.findOne({ biodataId: id });
      res.send(result);
    });

    app.get('/biodatas/email/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      const result = await biodatasCollection.findOne({ contactEmail: email });
      res.send(result || {});
    });

    app.get('/biodatas/similar/:type', async (req, res) => {
      const type = req.params.type;
      const excludeId = parseInt(req.query.excludeId) || 0;
      const result = await biodatasCollection.find({
        biodataType: type,
        biodataId: { $ne: excludeId }
      }).limit(3).toArray();
      res.send(result);
    });

    app.post('/biodatas', verifyToken, async (req, res) => {
      const biodata = req.body;
      // Auto generate biodataId
      const lastBiodata = await biodatasCollection.find().sort({ biodataId: -1 }).limit(1).toArray();
      const newId = lastBiodata.length > 0 ? lastBiodata[0].biodataId + 1 : 1;
      biodata.biodataId = newId;
      biodata.isPremium = false;
      biodata.createdAt = new Date();
      const result = await biodatasCollection.insertOne(biodata);
      res.send(result);
    });

    app.put('/biodatas/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      const biodata = req.body;
      const existing = await biodatasCollection.findOne({ contactEmail: email });

      if (existing) {
        const result = await biodatasCollection.updateOne(
          { contactEmail: email },
          { $set: biodata }
        );
        res.send(result);
      } else {
        // Auto generate biodataId
        const lastBiodata = await biodatasCollection.find().sort({ biodataId: -1 }).limit(1).toArray();
        const newId = lastBiodata.length > 0 ? lastBiodata[0].biodataId + 1 : 1;
        biodata.biodataId = newId;
        biodata.isPremium = false;
        biodata.createdAt = new Date();
        const result = await biodatasCollection.insertOne(biodata);
        res.send(result);
      }
    });

    // ==================== FAVOURITES ====================
    app.get('/favourites', verifyToken, async (req, res) => {
      const email = req.query.email;
      const favourites = await favouritesCollection.find({ userEmail: email }).toArray();
      // Get biodata details for each favourite
      const biodataIds = favourites.map(f => f.biodataId);
      const biodatas = await biodatasCollection.find({ biodataId: { $in: biodataIds } }).toArray();
      const result = favourites.map(f => {
        const biodata = biodatas.find(b => b.biodataId === f.biodataId);
        return { ...f, biodata };
      });
      res.send(result);
    });

    app.post('/favourites', verifyToken, async (req, res) => {
      const favourite = req.body;
      const existing = await favouritesCollection.findOne({
        userEmail: favourite.userEmail,
        biodataId: favourite.biodataId
      });
      if (existing) {
        return res.send({ message: 'Already in favourites', insertedId: null });
      }
      const result = await favouritesCollection.insertOne(favourite);
      res.send(result);
    });

    app.delete('/favourites/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await favouritesCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // ==================== CONTACT REQUESTS ====================
    app.get('/contact-requests', verifyToken, async (req, res) => {
      const email = req.query.email;
      const requests = await contactRequestsCollection.find({ requesterEmail: email }).toArray();
      // Get biodata details
      const biodataIds = requests.map(r => r.biodataId);
      const biodatas = await biodatasCollection.find({ biodataId: { $in: biodataIds } }).toArray();
      const result = requests.map(r => {
        const biodata = biodatas.find(b => b.biodataId === r.biodataId);
        return { ...r, biodata };
      });
      res.send(result);
    });

    app.get('/contact-requests/admin', verifyToken, verifyAdmin, async (req, res) => {
      const requests = await contactRequestsCollection.find().toArray();
      const biodataIds = requests.map(r => r.biodataId);
      const biodatas = await biodatasCollection.find({ biodataId: { $in: biodataIds } }).toArray();
      const result = requests.map(r => {
        const biodata = biodatas.find(b => b.biodataId === r.biodataId);
        return { ...r, biodata };
      });
      res.send(result);
    });

    app.post('/contact-requests', verifyToken, async (req, res) => {
      const request = req.body;
      request.status = 'pending';
      request.createdAt = new Date();
      const result = await contactRequestsCollection.insertOne(request);
      res.send(result);
    });

    app.patch('/contact-requests/approve/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const result = await contactRequestsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: 'approved' } }
      );
      res.send(result);
    });

    app.delete('/contact-requests/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await contactRequestsCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // ==================== PAYMENTS ====================
    app.post('/create-payment-intent', verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    app.post('/payments', verifyToken, async (req, res) => {
      const payment = req.body;
      payment.date = new Date();
      const result = await paymentsCollection.insertOne(payment);
      res.send(result);
    });

    // ==================== PREMIUM REQUESTS ====================
    app.get('/premium-requests', verifyToken, verifyAdmin, async (req, res) => {
      const result = await premiumRequestsCollection.find({ status: 'pending' }).toArray();
      res.send(result);
    });

    app.post('/premium-requests', verifyToken, async (req, res) => {
      const request = req.body;
      const existing = await premiumRequestsCollection.findOne({ userEmail: request.userEmail });
      if (existing) {
        return res.send({ message: 'Request already submitted', insertedId: null });
      }
      request.status = 'pending';
      request.createdAt = new Date();
      const result = await premiumRequestsCollection.insertOne(request);
      res.send(result);
    });

    app.patch('/premium-requests/approve/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const request = await premiumRequestsCollection.findOne({ _id: new ObjectId(id) });

      if (request) {
        // Update request status
        await premiumRequestsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: 'approved' } }
        );
        // Make user premium
        await usersCollection.updateOne(
          { email: request.userEmail },
          { $set: { isPremium: true } }
        );
        // Make biodata premium
        await biodatasCollection.updateOne(
          { contactEmail: request.userEmail },
          { $set: { isPremium: true } }
        );
      }
      res.send({ modifiedCount: 1 });
    });

    // ==================== SUCCESS STORIES ====================
    app.get('/success-stories', async (req, res) => {
      const result = await successStoriesCollection.find()
        .sort({ marriageDate: -1 })
        .toArray();
      res.send(result);
    });

    app.post('/success-stories', verifyToken, async (req, res) => {
      const story = req.body;
      story.createdAt = new Date();
      const result = await successStoriesCollection.insertOne(story);
      res.send(result);
    });

    // ==================== ADMIN STATS ====================
    app.get('/admin/stats', verifyToken, verifyAdmin, async (req, res) => {
      const totalBiodata = await biodatasCollection.countDocuments();
      const maleBiodata = await biodatasCollection.countDocuments({ biodataType: 'Male' });
      const femaleBiodata = await biodatasCollection.countDocuments({ biodataType: 'Female' });
      const premiumBiodata = await biodatasCollection.countDocuments({ isPremium: true });
      const revenue = await paymentsCollection.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]).toArray();
      const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;

      res.send({
        totalBiodata,
        maleBiodata,
        femaleBiodata,
        premiumBiodata,
        totalRevenue
      });
    });

    // Root
    app.get('/', (req, res) => {
      res.send('Matrimony Server is running');
    });

    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.log(error);
  }
}

run();

app.listen(port, () => {
  console.log(`Matrimony server running on port ${port}`);
});
