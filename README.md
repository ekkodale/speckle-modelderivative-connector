# speckle-modelderivative-connector
Speckle Model Derivative Connector

presented by TheBardsOfBaclava!
The connector was created during the first speckle Hackathon from 11th till 14th of May in 2022!

## What it does
This is a connector for speckle for models derivated via the Autodesk forge model derivative api.
It converts models avaiable in the svf2 format for forge viewer into speckle geometry / properties.
The derivated model is viewable with the forge viewer. You can load your own models, see section [Autodesk forge setup](#autodesk-forge-setup). Select your desired stream and now you're good to go! When the commit button is pressed, it pushes the geometry and meta information to the selected speckle stream! Cool, isn't it?

## Why Forge Model Derivative API?
Well, it helps us to consume 70+ different file formats into the .svf2 format. This is consumed by the forge viewer.
An outdated list of supported fileformats can be found here : https://forge.autodesk.com/en/docs/model-derivative/v2/developers_guide/supported-translations/
With this connector in place we can push all of those derivates to speckle without creating many additional, native, connectors! To create `viewable` results this is maybe enough? So we oopen up the specklerverse to software like Inventor, SolidWorks, Maja, 3dMax and do on.

# Prerequisits
Follow these steps to get a working copy up and running! We work an an completely dockerized version, but can't promise to get it done till the deadline. This is the manual way.

## Autodesk forge setup
You need to have a forge account in place to use the model derivate api. You can create a demo user at https://forge.autodesk.com/. The documentation, how to derivate models (in our case a revit model) can be found here : 
We've used the addin for visual studio code to create derivates. You can install it for free here: https://marketplace.visualstudio.com/items?itemName=petrbroz.vscode-forge-tools

You need to create an app inside your forge account to use the apis via the forge tools menitioned before. The client id and the secret needs to be inserted in the visual studion settings for forge to connect both. Please see the documentation of Petr Broz addin!

Try to derivate a model via the addin in vs code. First upload a file (Revit model), then translate it. we've used the custom translation with the option "create master views" to ensure all views and the {3d} view is created.
You can check the result inside vs code and view the derivate result.
Keep in mind, each derivation will cost forge cloud credits, so be carefull when trying with a real life account ;-)

An example could look like this:
![](/images/forge-addin-vscode.png)

You can view the results of the derivate inside vs code like that:
![](/images/forge-addin-vscode-preview-derivate.png)

Copy the urn of the 3D View in your new derivate to the clipboard. It needs to be inserted in the client app we've written in react.
![](/images/forge-addin-vscode-cpoy-urn.png)
For testing you can use the already added urn to use the model we've derivated.

## add urn of derivate to react app
If you want to add oýour own urn for a derivate, it needs to be inserted here:
![](/images/derivate%20urn.png)

## speckle Server and token
To make it as easy as possible we've used speckle.xyz for testing. Create an account here, add an personal access token for your user. This can be done in the user settings. We need write scope for commiting the geometry from forge!
The token needs to be inserted in the appsettings.json in our server .net solution. You can find the file in the solution folder.
![](/images/visualstudio-appsettings.png)
![](/images/speckle-token.png)
make sure you keep the `,`at the end of the line ;-)

# Prerequisits for docker
This feature is wip and not guranteed to be finished until the deadline of the hackathon.
You wan't to go the easy way? Have docker desktop installed on your machine? Then simply clone the repo, cd in an terminal into the docker subfolder. You need to edit the .env to match your [token](#speckle-server-and-token) and startup [urn](#add-urn-of-derivate-to-react-app). The second one is not important.
![](/images/docker%20env%20setup.png)

# Starting the system
If you go the manual way, these steps need to be taken. If you prefer to use docker and the [setup is in place](#prerequisits-for-docker), proceed with [starting with docker](#starting-with-docker).

## start the backend
We've created a .net backend to push the geometry to the speckle server. You need to open the solution in visual studio, build the artifacts and start it. The app will start a .net app and launch your default browser showing a swagger api.
![](/images/start%20backend.png)
The swagger api looks like this
![](/images/swagger%20api.png)

## start the frontend
The react app can be found in the client subfolder of the repo. open a commandline, cd into the subfolder client/src.

Run `npm install`to make sure all required packages are available.
Run `npm start`to start the app. It'll launch your standard browser and open the page at http://localhost:3000 

The forge viewer will load a default model we've used for testing.
![](/images/react-app-started.png)

## starting with docker
This one is easy! Simply open a terminal, cd into the docker subfolder and enter `docker-compose up -d`
You have to wait for some time, because the images will be build from the code. once all is done, you can open the [frontend](http://localhost:3000)

# Using the apps


### load your own model
You can replace the model with you own urn in the input box on the upper left. Press the `Change`button to load your model inside the viewer.


### Select the stream
Currently you need to select the id of the stream you want to push the geometry to. You can find the id in the share option for the stream. You can use the dropdown for that.
![](/images/react-app-selectstream.png)

### Commit your model to speckle
The final step is commiting your model to speckle. For this we've created the wonderfull `Commit` button ;-)
![](/images/react-app-commit-model.png)