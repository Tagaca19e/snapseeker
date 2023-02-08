const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to show the sign up form
app.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to handle form submissions
app.post('/signup', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Validate the form data
  if (!name || !email || !password) {
    res.render('signup', { error: 'All fields are required.' });
    return;
  }

  // Save the user's information securely (in this example, just log it)
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  res.render('signup', { success: 'Sign up successful!' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

/*< DOCTYPE html >
    <html>
        <head>
            <title>Sign Up Page</title>
        </head>
        <body>
            <h1>Sign Up</h1>
            <form action="#" method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                    <br><br>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                            <br><br>
                                <label for="password">Password:</label>
                                <input type="password" id="password" name="password" required/>
                                    <br><br>
                                        <input type="submit" value="Sign Up">
    </form>
  </body>
</html>*/