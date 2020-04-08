import Parse from 'parse'

export const state = () => ({
  list: {
    id: null,
    name: '',
    gender: '',
    relatives: '',
    deathTime: '',
    deathDate: '',
    mosqueName: '',
    graveyard: '',
    buryDate: '',
    prayTime: '',
    place: '',
    phone: '',
    author: 'محرّر الجمعية'
  }
})

export const mutations = {
  add (state, { key, text }) {
    state.list[key] = text
  },
  submit (state) {
    // Create in Backend
    Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
    Parse.initialize(
      'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
      'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
    )
    const currentUser = Parse.User.current()
    const Occasion = Parse.Object.extend('Occasion')
    const myNewObject = new Occasion()
    myNewObject.set('name', state.list.name)
    myNewObject.set('gender', state.list.gender)
    myNewObject.set('relatives', state.list.relatives)
    myNewObject.set('deathTime', state.list.deathTime)
    myNewObject.set('deathDate', state.list.deathDate)
    myNewObject.set('mosqueName', state.list.mosqueName)
    myNewObject.set('graveyard', state.list.graveyard)
    myNewObject.set('buryDate', state.list.buryDate)
    myNewObject.set('prayTime', state.list.prayTime)
    myNewObject.set('place', state.list.place)
    myNewObject.set('phone', state.list.phone)
    myNewObject.set('author', currentUser.getUsername())
    const acl = new Parse.ACL()
    acl.setPublicReadAccess(true)
    acl.setWriteAccess(Parse.User.current().id, true)
    acl.setRoleWriteAccess('editor', true)
    myNewObject.setACL(acl)
    myNewObject.save().then(
      (result) => {
        if (typeof document !== 'undefined') {
          // eslint-disable-next-line no-console
          console.log('created successfully')
        }
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    )
  }
}
