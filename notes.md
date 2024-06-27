db structure

restaurants
  id
  name
  description
  address
  phone
  instagramUser
  primaryMenu


menus
  id
  description
  primary,
  restaurantName
  SECTIONS:[
    {
      id:
      name:
      description:
      PRODUCTS:[
        {
          id:
          name:
          description:
          price:
          image
        }
      ]
    }
  ]



fix-----
remove navbar in the customer menu
adding restaurant name in breadcrum when you are in a menu

feature---
qr
change from one section to another
login with google
forgot password
payments
agregar validaciones en el lado del servidor
images

style---
creation menu page
customer menu page

infra---
deploy

You're on the right track! Here's how to manage your Firebase API keys for different environments in your React app hosted on Firebase App Hosting:
1. Environment Variables in apphosting.yaml
The Key: Firebase App Hosting uses the apphosting.yaml file to configure your deployment. This is where you'll define your environment variables.
Example:


env:- variable: FIREBASE_API_KEY_DEV  value: YOUR_DEV_API_KEY  availability:  - BUILD  - RUNTIME- variable: FIREBASE_API_KEY_PROD  value: YOUR_PROD_API_KEY  availability:  - BUILD  - RUNTIME

Generated code may be subject to license restrictions not shown here. Use code with care. Learn more 

FIREBASE_API_KEY_DEV and FIREBASE_API_KEY_PROD : These are the names of your environment variables. Choose descriptive names.
YOUR_DEV_API_KEY and YOUR_PROD_API_KEY : Replace these with your actual API keys for your development and production environments.
availability: BUILD, RUNTIME : This ensures the variables are available during both the build process and when your app is running.
2. Accessing Environment Variables in Your React App
process.env : In your React code, you can access these environment variables using process.env .


import React from 'react';function App() {  const apiKey = process.env.NODE_ENV === 'development'     ? process.env.FIREBASE_API_KEY_DEV     : process.env.FIREBASE_API_KEY_PROD;  // Use the apiKey to initialize Firebase  // ...}export default App;

Generated code may be subject to license restrictions not shown here. Use code with care. Learn more 

process.env.NODE_ENV : This variable is automatically set by Firebase App Hosting to either development or production .
Conditional Logic: The code uses a conditional statement to select the appropriate API key based on the environment.
3. Deployment
Firebase CLI: Use the Firebase CLI to deploy your app to different environments. You can create separate Firebase projects for development and production, or use different deployment configurations within the same project.
Important Considerations:
Security: Never hardcode your API keys directly into your React code. Environment variables are a much safer way to manage sensitive information.
Firebase Project: Make sure you have separate Firebase projects for development and production, each with its own unique API key.
Deployment: When deploying your app, ensure you're using the correct Firebase project and configuration for the environment you're targeting.
Let me know if you have any other questions
