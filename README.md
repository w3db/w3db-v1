# DW3JS - DECENTRALIZED DATABASE

DW3JS is a decentralised database uses IPFS for managing data 


## Usage

go to dw3js official page and create app for your project

install this package in your project directory

```
   # Yarn

   $ yarn add dw3js

```

   OR


``` 
  # npm

  $ npm i dw3js

```   


## Creating DW3 Instance 

   ``` javascript
       const { DW3JS } = require("dw3")

       const config = {
          address : // Your Wallet address
          appId   : // Your appID 
          secretString: // Your app secret string
          url     : // Your application url or localhost url for development mode
       }

       const dw3js = new DW3JS(config);

        
   ```

## ADDING NEW DOCUMENT 

   ``` javascript
   // adding new collection
   
   const userCollection = dw3js.Collection("Users");

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

