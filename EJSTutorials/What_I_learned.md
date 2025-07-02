# 🚀 Express.js Routing & Middleware Guide

A comprehensive guide to understanding routes, middleware, and dynamic routing in Express.js

## 📋 Table of Contents
- [Routes](#-routes)
- [Middleware](#-middleware)
- [Dynamic Routes](#-dynamic-routes)
- [Parameters](#-parameters)
- [Route Parameters](#-route-parameters)

---

## 🛣️ Routes

Routes are the basic pages or endpoints of your web application. They define what happens when a user visits a specific URL path after the domain name.

**Structure:**
```
http://localhost:3000/profile
```

In this example:
- `http://localhost:3000` is the base URL
- `/profile` is the **route**

Routes determine which code gets executed when users navigate to different parts of your application.

---


## ⚙️ Middleware

Middleware functions are like gatekeepers that run **before** your routes are executed. Think of them as checkpoints that every request must pass through.

Matlab koi bhi route run ho middleware hmesa sabse phle run hoga.

**Key Characteristics:**
- Always executes before route handlers
- Can modify request/response objects
- Can terminate the request-response cycle
- Must call `next()` to continue to the next middleware or route

**Basic Syntax:**
```javascript
app.use(function (req, res, next) {
    // Middleware logic here
    console.log('Middleware executed!');
    next(); // Don't forget this!
});
```

### Understanding the Parameters:

| Parameter | Description |
|-----------|-------------|
| **`req`** | Contains user data sent from client to server (request object) |
| **`res`** | Contains server data that will be sent back to client (response object) |
| **`next`** | Function that passes control to the next middleware or route handler |

> ⚠️ **Important:** If you don't call `next()`, the request will hang and no subsequent routes will execute!

---

## 🔄 Dynamic Routes

Dynamic routes are powerful tools for handling URLs where part of the path changes based on user input, while keeping the structure consistent.

We don't need to make same type of routes each person.

**Problem:** Instead of creating separate routes for each user:

`Example`

```javascript
    www.google.com/profile/Person_1
    www.google.com/profile/Person_2
    www.google.com/profile/Person_3
    www.google.com/profile/Person_4
    www.google.com/profile/Person_5
```

For the above example the domain name till the profile part is constant, So instead of making the many different routes for these person we need to do just little thing like below shown-:

**Solution:** Use dynamic routing with parameters:

### Real-World Examples:

```
    www.google.com/profile/:username
```

**Dynamic Route Implementation:**
```javascript
app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Welcome to ${username}'s profile!`);
});
```

### How It Works:
- The `:` symbol indicates a dynamic parameter
- `:username` becomes a placeholder for any value
- The actual value can be accessed via `req.params.username`

---
## params 

Params help you make one route work for many different values instead of creating hundreds of separate routes. 

When someone visits /profile/john, the website will show "Hello john!"

When someone visits /profile/mary, the website will show "Hello mary!"

Route parameters-: 

- To make any route dynaming we use `:` at the place where we want to make it dynamic, and to access theree value use req.params


## Template engines (ejs)

- HTML dont have any super power to do calculation, so for using the calculation power we can use ejs template engines. 
- Its same like `HTML`, Like we can do HTML code in ejs.

### Setup for ejs

1. ejs install 

```bash
    npm i ejs
```

2. configure ejs

- before the any route just write the code given below.

```javascript
    app.set("view engine", "ejs")

```

3. Make an `views` folder

4. Inside it make an ejs file

5. In place of `send` use `render` function.
    - Make sure that use the file from inside the views folder, and no need to mention the `.ejs` .