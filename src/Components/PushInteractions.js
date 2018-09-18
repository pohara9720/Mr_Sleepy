import { NotificationAction, NotificationCategory } from 'react-native-notifications'


let stopAlarm = new NotificationAction({
	activationMode: "background",
	title: 'Stop',
	identifier: "STOP_ACTION"
}, (action, completed) => {
  console.log("ACTION RECEIVED")
  console.log(JSON.stringify(action))

  // You must call to completed(), otherwise the action will not be triggered
  completed()
})

let snoozeTrigger = new NotificationAction({
	activationMode: "background",
	title: "Snooze",
	authenticationRequired: true,
	identifier: "SNOOZE_ACTION"
}, (action, completed) => {
  console.log("ACTION RECEIVED")
  console.log(action)

  completed()
})


export const actions = new NotificationCategory({
  identifier: "actions",
  actions: [stopAlarm, snoozeTrigger],
  context: "default"
})
