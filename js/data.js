


(function() {

  app.factory('userService', function(utils, labelService, groupService) {
      /**
      Users parameters:
        int id - unique
        string username
        array permissions
        int unitId - id of unit group in which belongs
        int size
        string email
        array user - optional, user, who recomended externist

      */
      return {
        /*
          join users labels
        */
        getById: function(userId){
          var user = utils.findById(users, userId);
          user.labels = labelService.getForUser(userId);
          user.groups = groupService.getForUser(userId);
          return user;
        },

        getExternistsForUnit: function(unitId){
          var result = utils.getAllWhere(users, "unitId", unitId);
          result = utils.getAllWhereNotNull(result, "user");
          return result;
        },

        getWhere: function(column, value, array){
          if (array === null) array = users;
          return utils.getAllWhere(array, column, value);
        },
        getAll: function(){
          return users;
        },
        create: function(user){
          // create on server side
          return user;
        },
        deleteUser: function(userId){
          // delete on server side
        }, 
        updateUser: function(user){
          // update on server side
          return user;
        } 

      };
  });

  app.factory('labelService', function(utils) {
      /**
      Users parameters:
        int id - unique
        string name
        string color
        int userId 
      */
      return {
        getById: function(labelId){
          return utils.findById(labels, labelId);
        },
        getForUser: function(userId){
          return utils.getAllWhere(labels, "userId", userId);
        },
        create: function(label){
          // create on server side
          return label;
        },
        deleteLabel: function(labelId){
          // delete on server side
        }, 
        updateLabel: function(label){
          // update on server side
          return label;
        } 
      };

  });

  app.factory('groupService', function(utils) {
      /**
      Users parameters:
        int id - unique
        string name
        array users
        int userId 
      */
      return {
        
        getById: function(groupId){
          return utils.findById(groups, groupId);
        },
        getForUser: function(userId){
          return utils.getAllWhere(groups, "userId", userId);
        },
        create: function(group){
          // create on server side
          return group;
        },
        deleteGroup: function(groupId){
          // delete on server side
        }, 
        updateGroup: function(group){
          // update on server side
          return group;
        } 
      };
  });

//-------------------------------------------------------------
// ---------------- UTILS --------------------------------------
//-------------------------------------------------------------

app.factory('utils', function () {
  return {
    // Util for finding an object by its 'id' property among an array
    findById: function findById(array, id) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].id == id) return array[i];
      }
      return null;
    },

    // Util for finding an object by its 'id' property among an array
    getAllWhere: function getAllWhere(array, column, value) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        if (typeof array[i][column] !== 'undefined' && array[i][column] == value) result.push(array[i]);
      }
      return result;
    },

    // Util for finding an object by its 'id' property among an array
    getAllWhereNotNull: function getAllWhereNotNull(array, column) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        if (typeof array[i][column] !== 'undefined') result.push(array[i]);
      }
      return result;
    }


  };
});

//-------------------------------------------------------------
// ---------------- DATA --------------------------------------
//-------------------------------------------------------------

  var users = [
    //super user
    {id: 1,
      username: "SuperUser",
      email: "jan.novak@fel.cvut.cz",
      unitId: 0,
      permissions: {
        units: true, 
        externists: false,
        password: false
      },
      size: 0
    },
    // manager of units
    {id: 2,
      username: "UnitsManager",
      email: "jan.novak@fel.cvut.cz",
      unitId: 1,
      permissions: {
        units: false, 
        externists: true,
        password: false
      },
      size: 4
    },
    // externist
    {id: 3,
      username: "Externist",
      email: "jan.novak@fel.cvut.cz",
      unitId: 1,
      permissions: {
        units: false, 
        externists: false,
        password: true
      },
      user: {
        id: 1,
        email:  "jan.novak@fel.cvut.cz",
      },
      size: 6
    },
    // student
    {id: 4,
      username: "Student",
      email: "jan.novak@fel.cvut.cz",
      unitId: 2,
      permissions: {
        units: false, 
        externists: false,
        password: false
      },
      unitId: 1,
      size: 8
    }];

  // ----- labels -----
  var labels = [{
    id: 1,
    name: "Štítek 1",
    color: "red",
    userId: 2
  },
  {
    id: 2,
    name: "Štítek 2",
    color: "blue",
    userId: 3
  }];

  // ----- groups -----
  var groups = [{
      id: 1,
      name: "Moje skupina",
      users: ["Jan Novák"],
      userId: 2
  },{
      id: 2,
      name: "Moje skupina druhá",
      users: ["Petr Novák", "Karolína Novotná"],
      userId: 3
  }];

  })();