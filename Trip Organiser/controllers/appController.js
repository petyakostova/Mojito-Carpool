import 'jquery'
import { menuController } from "./menuController"
import { currentUserController } from "./userControllers/currentUserController"
import {mapController} from './mapController/mapController'

currentUserController.displayCurrentUserInApplication();
menuController();