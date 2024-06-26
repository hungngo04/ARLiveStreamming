# About the project
This project enables streamers to broadcast their camera feed directly into the viewer's augmented reality (AR) scene, utilizing WebXR and JavaScript.

# Project Setup Instructions

This document provides instructions for setting up and running the project on both the server and client sides.

## Server Side Setup

### Install the Dependencies

To install the necessary dependencies, run the following command in your terminal:

```bash
npm install
```

### Run the server

To start the server, execute:

```bash
node index.js
```

This project uses A-Frame for displaying AR content. Except when accessed from localhost, the server must be run over a certified HTTPS connection. To achieve a certified SSL setup, it is recommended to use ngrok.

### Setting Up ngrok for HTTPS connection: 

After downloading and setting up ngrok, create a remote HTTPS server by running:

```bash
ngrok http 3006
```

## Client Side Setup
### PC Client

To access the project from a PC:

1. Open a web browser (Chrome is preferred).
2. Navigate to `localhost:3006`.
3. An alert will appear asking if you're a streamer. Select `OK` to proceed, indicating that you're streaming from the computer.

### Mobile Client

To run the app on mobile phones:

1. Open a web browser (Chrome is preferred).
2. Enter the HTTPS link provided in the `Forwarding` section generated by ngrok into the browser's URL bar.
3. You will encounter an alert asking if you're a streamer. Choose `Cancel` to proceed as a viewer.
4. Allow the required permissions, and you'll be able to view the AR scene. 
