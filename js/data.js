


(function() {

  app.factory('userService', function(utils) {
      /**
      Users parameters:
        int id - unique
        string username - 
        array permissions
        int unitId - id of unit group in which belongs
      */
      return {
        getById: function(userId){
          return utils.findById(users, userId);
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
        if (array[i][column] == value) result.push(array[i]);
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
      permissions: {
        units: true, 
        externists: false,
        password: false
      },
      unitId: 1
    },
    // manager of units
    {id: 2,
      username: "UnitsManager",
      permissions: {
        units: false, 
        externists: true,
        password: false
      },
      unitId: 1
    },
    // externist
    {id: 3,
      username: "Externist",
      permissions: {
        units: false, 
        externists: false,
        password: true
      },
      unitId: 1
    },
    // student
    {id: 4,
      username: "Student",
      permissions: {
        units: false, 
        externists: false,
        password: false
      },
      unitId: 1
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