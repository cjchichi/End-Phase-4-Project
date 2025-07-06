  /*
   const express = require('express');
   const cors = require('cors'); // Import the cors package
   const app = express();

   // Use CORS middleware
   app.use(cors({
     origin: 'https://study-group-app.netlify.app' // Replace with your frontend URL
   }));

   // Other middleware
   app.use(express.json()); // For parsing application/json

   // Define your routes here
   app.get('/api/groups', (req, res) => {
     // Your logic to handle the request
     res.json({ message: 'Groups fetched successfully' });
   });

   // Start the server
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
  */
 
   const express = require('express');
const cors = require('cors'); // Import the cors package
const { json } = require('body-parser'); // Import body-parser for parsing JSON
const { GroupMembership, StudyGroup, db } = require('./models'); // Adjust the path to your models
const { membershipSchema, groupSchema } = require('./schemas'); // Adjust the path to your schemas
const { jwtRequired, getJwtIdentity } = require('./auth'); // Adjust the path to your auth middleware

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'https://study-group-app.netlify.app' // Replace with your frontend URL
}));

// Middleware for parsing application/json
app.use(express.json());

// MEMBERSHIPS Routes

// Create Membership
app.post('/api/memberships', async (req, res) => {
  const data = req.body;

  const existing = await GroupMembership.findOne({
    where: {
      user_id: data.user_id,
      study_group_id: data.study_group_id
    }
  });

  if (existing) {
    return res.status(400).json({ error: "User  is already a member of this group" });
  }

  const membership = await GroupMembership.create({
    user_id: data.user_id,
    study_group_id: data.study_group_id,
    role: data.role
  });

  return res.status(201).json(membershipSchema.dump(membership));
});

// Leave Group
app.delete('/api/memberships/:id', jwtRequired, async (req, res) => {
  const membership = await GroupMembership.findByPk(req.params.id);
  if (!membership) {
    return res.status(404).json({ error: "Membership not found" });
  }

  await membership.destroy();
  return res.json({ message: 'Left group' });
});

// Update Membership
app.put('/api/memberships/:id', jwtRequired, async (req, res) => {
  const membership = await GroupMembership.findByPk(req.params.id);
  if (!membership) {
    return res.status(404).json({ error: "Membership not found" });
  }

  membership.role = req.body.role || membership.role;
  await membership.save();

  return res.json(membershipSchema.dump(membership));
});

// Update Group
app.put('/api/groups/:id', jwtRequired, async (req, res) => {
  const user_id = getJwtIdentity(req);
  const group = await StudyGroup.findByPk(req.params.id);
  if (!group) {
    return res.status(404).json({ error: "Group not found" });
  }

  if (group.creator_id !== user_id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  group.name = req.body.name;
  group.description = req.body.description;
  await group.save();

  return res.json(groupSchema.dump(group));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
