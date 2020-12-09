// Routes that are linked to push notifications
const express = require("express");
const { Expo } = require("expo-server-sdk");
const router = express.Router()
const expo = new Expo();
const db = require('../src/non_realtime_db/mariadb_queries')
const mysql = require('mysql')

const saveToken = token => {
    console.log('saveToken function:', token)
    db.getTokens((result) => {
        console.log('result', result)
        const exists = result.find(t => t.token === token)
        console.log('exists?', exists)
        if (!exists) {
            db.saveToken(token, (result) => {
                console.log('Saved!', result)
            })
        }
    })    
}

// https://dev.to/josedonato/minimalist-approach-to-send-push-notifications-with-expo-4m7h
const handlePushTokens = ({ title, body }) => {
    // Create the messages that you want to send to clents
    let notifications = [];
    let savedPushTokens
    db.getTokens((result) => {
      //console.log('result', result)
      savedPushTokens = result
      //console.log('expotokenarray', savedPushTokens)
      let tokens = savedPushTokens.map(t => t.token)
      console.log('tokens', tokens)
      for (let pushToken of tokens) {
          // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
  
          // Check that all your push tokens appear to be valid Expo push tokens
          if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          continue;
          }
  
          // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
          notifications.push({
          to: pushToken,
          sound: "default",
          title: title,
          body: body,
          url: "https://www.yle.fi/uutiset",
          data: { body }
          });
      }
  
      // The Expo push notification service accepts batches of notifications so
      // that you don't need to send 1000 requests to send 1000 notifications. We
      // recommend you batch your notifications to reduce the number of requests
      // and to compress them (notifications with similar content will get
      // compressed).
      let chunks = expo.chunkPushNotifications(notifications);
  
      (async () => {
          // Send the chunks to the Expo push notification service. There are
          // different strategies you could use. A simple one is to send one chunk at a
          // time, which nicely spreads the load out over time:
          for (let chunk of chunks) {
          try {
              let receipts = await expo.sendPushNotificationsAsync(chunk);
              console.log('receipts', receipts);
          } catch (error) {
              console.error(error);
          }
          }
      })();
    })
  };

router.post("/push_token", (req, res) => {
    console.log('body', req.body)
    // tarkista, mitä kenttiä objektissa on!!!
    saveToken(req.body.token);
    console.log(`Received push token, ${req.body.token}`)
    res.send(`Received push token, ${req.body.token}`)
})

router.post("/message", (req, res) => {
    handlePushTokens(req.body);
    console.log(`Received message, with title: ${req.body.title}`)
    res.send(`Received message, with title: ${req.body.title}`)
})

module.exports = router