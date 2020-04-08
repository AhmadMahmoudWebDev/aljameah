const Parse = require('parse')

Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
Parse.initialize(
  'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
  'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
)
export default async function ({ redirect }) {
  const currentUser = await Parse.User.current()
  if (currentUser) {
    // let the user in
  } else {
    // redirect
    redirect('/login')
  }
}
