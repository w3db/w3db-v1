# W3DB - DECENTRALIZED DATABASE

W3DB is a decentralised database uses IPFS for managing data 


## Usage

go to w3db official page and create app for your project

install this package in your project directory

```
   # Yarn

   $ yarn add w3db

```

   OR


``` 
  # npm

  $ npm i w3db

```   


## Creating W3DB Instance 

   ``` javascript
       const { W#DB } = require("dw3")

       const config = {
          address : // Your Wallet address
          appId   : // Your appID 
          secretString: // Your app secret string
          url     : // Your application url or localhost url for development mode
       }

       const w3db = new W3DB(config);

        
   ```

## ADDING NEW DOCUMENT 

   ``` javascript
   // adding new collection
   
   const userCollection = w3db.Collection("Users");

   //

  const isSuccess = await userCollection.addDoc({ _id: "1233434854323485",firstName: "JOHN", lastName: "DOE" });


   ```


## GET A PARTICULAR DOCUMENT 

   ``` javascript

     const doc =  await userCollection.getDoc({ _id: "1233434854323485" });

   
   ```


## UPDATING A PARTICULAR DOCUMENT 

   ``` javascript

    const isSuccess =  await userCollection.updateDoc({ _id: "1233434854323485" },{ lastName: "WICK" });

   
   ```


## DELETING A PARTICULAR DOCUMENT 

   ``` javascript

    const isSuccess =  await userCollection.deleteDoc({ _id: "1233434854323485" });

   
   ```


## DELETING A COLLECTION 

   ``` javascript

     const isSuccess = await userCollection.delete()

   
   ```

