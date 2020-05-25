
const usersCollection = firebase.firestore().collection('users');
let allUsers = usersCollection.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });



const deneme = firebase.firestore().collection('users').doc('aElFJ6s27QvBvZSSvYn9').collection('cameras').doc('BHJ2mwhO6TQHRLrN1VhI').collection('lines');
let allDeneme = deneme.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

let data = {
  state: 'CAA',
  country: 'USAA'
};

let setDoc = firebase.firestore().collection('users').doc('aElFJ6s27QvBvZSSvYn9').update(data);


<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
  <OptionButton
    icon="md-camera"
    label="Home Camera"
    //onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
  />

  <OptionButton
    icon="md-camera"
    label="Office Camera"
    //onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
  />

  <OptionButton
    icon="md-camera"
    label="Camera 3"
    //onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
    isLastOption
  />
</ScrollView>);

setTimeout(() => {  return cams; }, 5000);

function fetchCams(){
  const db = firebase.firestore(app);
  const cameras = db.collection('users').doc('vuLuy2M8vId2wncLy84t').collection('cameras');
  var cams = new Array();
  var string = "";
  db.collection('users').doc('vuLuy2M8vId2wncLy84t').collection('cameras').get().then((snapshot) => {
      snapshot.docs.forEach( doc => {
        cams.push(doc.data().name);
      });
    })
  console.log(cams);
  return cams;
}
