const admin = require('firebase-admin');
const serviceAccount = require('./yongs-dining-firebase-adminsdk-fbsvc-7c97e7ef5c.json');
const menuData = require('./yongs_dining_menu.updated.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadMenu() {
  const batch = db.batch();

  menuData.forEach((item) => {
    const docRef = db.collection('menus').doc(); // 'menus'는 컬렉션 이름
    batch.set(docRef, item);
  });

  await batch.commit();
  console.log('✅ 메뉴 업로드 완료');
}

uploadMenu();