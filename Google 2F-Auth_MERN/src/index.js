// const express = require("express")
// const path = require("path")
// const app = express()
// const bodyParser = require('body-parser');
// const speakeasy = require('speakeasy');
// const qrcode=require('qrcode');
// // const hbs = require("hbs")
// const LogInCollection = require("./mongo")
// const port = process.env.PORT || 3001

// app.use(express.json())

// app.use(express.urlencoded({ extended: false }))

// const tempelatePath = path.join(__dirname, '../tempelates')
// const publicPath = path.join(__dirname, '../public')
// console.log(publicPath);

// app.set('view engine', 'hbs')
// app.set('views', tempelatePath)
// app.use(express.static(publicPath))
// app.use(express.urlencoded({extended:false}))

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // hbs.registerPartials(partialPath)

// app.get('/signup', (req, res) => {
//     res.render('signup')
// })
// app.get('/', (req, res) => {
//     res.render('login')
// })


// app.post('/signup', async (req, res) => {
//     try {
//         const { name, password } = req.body;
        
//         // Check if user already exists
//         const checking = await LogInCollection.findOne({ name: name });

//         if (checking) {
//             // User already exists
//             if (checking.password === password) {
//                 return res.send("User details already exist");
//             } else {
//                 return res.send("User already exists with a different password");
//             }
//         }

//          // Generate a new secret for 2FA
         
//         // Create new user if not found
//         const newUser = new LogInCollection({ name, password });
//         await newUser.save();

//         res.status(201).render("home", {
//             naming: name
//         });

//     } catch (error) {
//         console.error("Error during signup process:", error);
//         res.status(500).send("An error occurred during signup");
//     }
// });

// app.post('/login', async (req, res) => {
//     try {
//         const { name, password } = req.body;

//         // Check if user exists
//         const user = await LogInCollection.findOne({ name });

//         if (!user) {
//             return res.send("User not found");
//         }

//         // Check if the password matches
//         if (user.password === password) {
//             // Redirect to 2FA page with user data
//             console.log(`User ${name} logged in successfully.`);
//             res.redirect(`/2fa?name=${name}`);
//         } else {
//             return res.send("Incorrect password");
//         }

//     } catch (error) {
//         console.error("Error during login process:", error);
//         return res.status(500).send("An error occurred during login");
//     }
// });


// // Endpoint to render the 2FA authentication page
// app.get('/2fa', async (req, res) => {
//     const { name } = req.query;
//     console.log(`2FA setup for user: ${name}`);

//     try {
//         // Find user by name in MongoDB
//         const user = await LogInCollection.findOne({ name });

//         if (!user) {
//             return res.status(404).send("User not found");
//         }

//         let secret = user.secret;

//         if (!secret) {
//             // Generate a new secret if not already set
//             secret = authenticator.generateSecret();
//             const otpauth_url = authenticator.keyuri(name, 'LoginApp', secret);

//             // Save secret to user document in MongoDB
//             user.secret = secret;
//             await user.save();

//             // Generate QR code image data
//             qrcode.toDataURL(otpauth_url, (err, data_url) => {
//                 if (err) {
//                     console.error('Error generating QR code:', err);
//                     return res.status(500).send('Error generating QR code');
//                 }

//                 // Render 2FA authentication page with necessary data
//                 res.render('2faauth', { name, otpauth_url, qr_code: data_url });
//             });
//         } else {
//             // Generate OTP authentication URL
//             const otpauth_url = authenticator.keyuri(name, 'LoginApp', secret);

//             // Generate QR code image data
//             qrcode.toDataURL(otpauth_url, (err, data_url) => {
//                 if (err) {
//                     console.error('Error generating QR code:', err);
//                     return res.status(500).send('Error generating QR code');
//                 }

//                 // Render 2FA authentication page with necessary data
//                 res.render('2faauth', { name, otpauth_url, qr_code: data_url });
//             });
//         }
//     } catch (error) {
//         console.error('Error setting up 2FA:', error);
//         res.status(500).send('Server error');
//     }
// });

// // Endpoint to handle 2FA verification
// app.post('/verify2fa', async (req, res) => {
//     const { name, otp } = req.body;
//     console.log(`Verifying 2FA for user: ${name}`);

//     try {
//         // Find user by name in MongoDB
//         const user = await LogInCollection.findOne({ name });

//         if (!user) {
//             return res.status(404).send("User not found");
//         }

//         // Verify the OTP
//         const isValid = authenticator.verify({ token: otp, secret: user.secret });

//         if (isValid) {
//             // Successful verification
//             res.render('home', { naming: name });
//         } else {
//             // Failed verification
//             // res.status(201).send("User Login ");
//             res.render('home', { naming: name });
//         }
//     } catch (error) {
//         console.error('Error verifying 2FA:', error);
//         res.status(500).send('Server error');
//     }
// });

// // Example home route
// app.get('/home', (req, res) => {
//     // Render your home page
//     res.render('home');
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// app.listen(port, () => {
//     console.log('port connected');
// })



//new

















