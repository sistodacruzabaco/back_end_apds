const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const feedRoutes = require('./routes/feedRoutes');
const donationRoutes = require('./routes/donationRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const activityRoutes = require('./routes/activityRoutes'); 
const opportunityRoutes = require('./routes/opportunityRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json()); // Parse JSON request bodies\
app.use(cookieParser());
app.use(cors());

app.use('/api', userRoutes); // Use the /api prefix for your routes
app.use('/api', projectRoutes); 
app.use('/api', employeeRoutes); 
app.use('/api', feedRoutes);  
app.use('/api', donationRoutes);
app.use('/api', partnerRoutes);
app.use('/api', activityRoutes);
app.use('/api', opportunityRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});