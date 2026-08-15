const fs = require('fs');
const path = require('path');

const components = [
  'src/components/Navbar/Navbar.jsx',
  'src/components/Footer/Footer.jsx',
  'src/pages/Home/Home.jsx',
  'src/pages/Biodatas/Biodatas.jsx',
  'src/pages/Login/Login.jsx',
  'src/pages/Register/Register.jsx',
  'src/pages/BiodataDetails/BiodataDetails.jsx',
  'src/pages/Checkout/Checkout.jsx',
  'src/pages/AboutUs/AboutUs.jsx',
  'src/pages/ContactUs/ContactUs.jsx',
  'src/pages/Dashboard/EditBiodata/EditBiodata.jsx',
  'src/pages/Dashboard/ViewBiodata/ViewBiodata.jsx',
  'src/pages/Dashboard/MyContactRequest/MyContactRequest.jsx',
  'src/pages/Dashboard/FavouritesBiodata/FavouritesBiodata.jsx',
  'src/pages/Dashboard/GotMarried/GotMarried.jsx',
  'src/pages/Dashboard/AdminDashboard/AdminDashboard.jsx',
  'src/pages/Dashboard/ManageUsers/ManageUsers.jsx',
  'src/pages/Dashboard/ApprovedPremium/ApprovedPremium.jsx',
  'src/pages/Dashboard/ApprovedContactRequest/ApprovedContactRequest.jsx',
  'src/pages/Dashboard/SuccessStoryAdmin/SuccessStoryAdmin.jsx'
];

components.forEach(comp => {
  const fullPath = path.join(__dirname, 'client', comp);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const name = path.basename(comp, '.jsx');
  const content = `import React from 'react';\n\nconst ${name} = () => {\n  return (\n    <div>\n      <h2>${name} Component</h2>\n    </div>\n  );\n};\n\nexport default ${name};\n`;
  
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log(`Created ${comp}`);
  }
});
