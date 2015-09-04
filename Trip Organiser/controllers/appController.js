import 'jquery'
import { globals } from "./../assets/globals.js"
import { menuController } from "./menuController"
import { DOMManipulationController } from "./DOMController/DOMManipulationController"

DOMManipulationController.displayCurrentUserInMenu();
globals.functions.hideLoader();
menuController();