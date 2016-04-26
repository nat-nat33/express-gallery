var models = require('../models');
var faker = require('faker');

models.sequelize
  .sync({force: true}) //replaces data
  .then(function(){

    var galleryData = []; //empty array to push mock data into
    var totalEntries = faker.random.number({min:15, max: 20});
    var catergories = ['people', 'abstract', 'city', 'fashion', 'technics']; //lorempixel.com
    for (var i = 0; i < totalEntries; i++){
      var randomLorem = faker.random.arrayElement(catergories);
      galleryData.push(
      {
        author: faker.name.findName(),
        link: faker.imageUrl(900, 1500, randomLorem),
        description: faker.lorem.sentences()
      }
        );
    }
});