'use strict'

angular
  .module('todo', ['ngRoute'])
  .config($routeProvider =>
    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'partials/main.html',
      })
      .when('/todo', {
        controller: 'TodoCtrl',
        templateUrl: 'partials/todo.html',
      })
  )
  .controller('MainCtrl', function ($scope, $http) {
    $http
      .get('/api/title')
      .then(({ data: { title }}) =>
        $scope.title = title
      )
  })
  .controller('TodoCtrl', function ($scope, $http) {
    $scope.sendToDo = () => {
      const todo = {
        title: $scope.title,
        content: $scope.content,
      }

      $http
        .post('api/todos', todo)
        .then(() => $scope.todos.push(todo))
        .catch(console.error)
    }

    $http
      .get('api/todos')
      .then(({ data: { todos }}) =>
        $scope.todos = todos
      )
  })

