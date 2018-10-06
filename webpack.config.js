module.exports = {
    // This is the entry point or start of our react applicaton
    entry: "./app/app.js",
    // The plain compiled JavaScript will be output into this file
    output: {
      filename: "public/bundle.js"
    },
    // This section desribes the transformations we will perform
    module: {
      loaders: [
        {
          // Only working with files that in in a .js or .jsx extension
          test: /\.jsx?$/,
          // Webpack will only process files in the app folder. So no node modules or anything.
          include: /app/,
          loader: "babel",
          query: {
            // These are the specific transformations to use.
            presets: ["react", "es2015"]
          }
        }
      ]
    },
    // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
    // Without this the console says all errors are coming from just coming from bundle.js, which is a total nightmare.
    devtool: "eval-source-map"
  };