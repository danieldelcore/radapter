import angular from 'angular';

import RadapterService from './radapter-service';
import radapterDirective from './radapter-directive';

export default angular
    .module('radapter', [])
    .service('radapterRegistry', RadapterService)
    .directive('radapter', radapterDirective);
