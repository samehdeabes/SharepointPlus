import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/esm/asyncToGenerator";
import ajax from '../utils/ajax.js';
import _buildBodyForSOAP from '../lists/_buildBodyForSOAP.js';
import getURL from '../utils/getURL.js';
/**
  @name $SP().addressbook
  @function
  @category people
  @description Find an user based on a part of his name

  @param {String} [word] A part of the name from the guy you're looking for
  @param {Object} [setup] Options (see below)
    @param {String} [setup.limit=10] Number of results returned
    @param {String} [setup.type='User'] Possible values are: 'All', 'DistributionList', 'SecurityGroup', 'SharePointGroup', 'User', and 'None' (see http://msdn.microsoft.com/en-us/library/people.spprincipaltype.aspx)
    @param {String} [setup.url='current website'] The website url
  @return {Promise} resolve([{AccountName,UserInfoID,DisplayName,Email,Departement,Title,PrincipalType}]), reject(error)

  @example
  $SP().addressbook("john", {limit:25}).then(function(people) {
    for (var i=0; i &lt; people.length; i++) {
      for (var j=0; j &lt; people[i].length; j++) console.log(people[i][j]+" = "+people[i][people[i][j]]);
    }
  });
*/

export default function addressbook(_x, _x2) {
  return _addressbook.apply(this, arguments);
}

function _addressbook() {
  _addressbook = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(username, setup) {
    var data,
        aResult,
        children,
        name,
        value,
        i,
        lenR,
        j,
        lenC,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.t0 = _args.length;
            _context.next = _context.t0 === 0 ? 4 : _context.t0 === 1 ? 7 : 9;
            break;

          case 4:
            username = "";
            setup = {};
            return _context.abrupt("break", 9);

          case 7:
            if (typeof username === "string") setup = {};else {
              setup = username;
              username = "";
            }
            return _context.abrupt("break", 9);

          case 9:
            if (setup.url) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return getURL.call(this);

          case 12:
            setup.url = _context.sent;

          case 13:
            setup.limit = setup.limit || 10;
            setup.type = setup.type || "User";
            _context.next = 17;
            return ajax.call(this, {
              url: setup.url + "/_vti_bin/People.asmx",
              body: _buildBodyForSOAP("SearchPrincipals", "<searchText>" + username + "</searchText><maxResults>" + setup.limit + "</maxResults><principalType>" + setup.type + "</principalType>"),
              headers: {
                'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/SearchPrincipals'
              }
            });

          case 17:
            data = _context.sent;
            aResult = []; // get the details

            data = data.getElementsByTagName('PrincipalInfo');

            for (i = 0, lenR = data.length; i < lenR; i++) {
              children = data[i].childNodes;
              aResult[i] = [];

              for (j = 0, lenC = children.length; j < lenC; j++) {
                name = children[j].nodeName;
                value = children[j].firstChild;
                if (value) value = value.nodeValue;
                aResult[i].push(name);
                aResult[i][name] = value;
              }
            }

            return _context.abrupt("return", _Promise.resolve(aResult));

          case 24:
            _context.prev = 24;
            _context.t1 = _context["catch"](0);
            return _context.abrupt("return", _Promise.reject(_context.t1));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 24]]);
  }));
  return _addressbook.apply(this, arguments);
}