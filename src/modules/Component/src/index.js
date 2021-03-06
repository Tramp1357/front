
import PropTypes from "prop-types";

import PrismaCmsComponent from "@prisma-cms/component";

export default class CustomComponent extends PrismaCmsComponent {

  // static contextTypes = {
  //   ...PrismaCmsComponent.contextTypes,
  //   Avatar: PropTypes.func.isRequired,
  // }

}

// import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'

// import Snackbar from '../../Snackbar';

// import URI from 'urijs';

// export default class CustomComponent extends React.Component {

//   // static propTypes = {
//   //   prop: PropTypes
//   // }

//   static contextTypes = {
//     router: PropTypes.object.isRequired,
//     client: PropTypes.object.isRequired,
//     loadApiData: PropTypes.func.isRequired,
//     user: PropTypes.object,
//   }


//   state = {}


//   addError(error) {

//     error = error || "Request error";

//     this.setState({
//       error,
//     }, () => {
//       setTimeout(() => {

//         // Проверка не очень надежная, так как строки не учитывают инстанс,
//         // но это лучше, чем ничего.
//         if (error === this.state.error) {
//           this.setState({
//             error: null,
//           });
//         }

//       }, 5000);
//     });
//   }


//   query(params) {

//     return this.request("query", params);

//   }


//   mutate(params) {

//     return this.request("mutate", params);

//   }

//   async request(method, params) {

//     this.setState({
//       loading: true,
//     });

//     const {
//       client,
//     } = this.context;

//     const result = await client[method](params)
//       .catch(error => {
//         // console.error(error);

//         return error;
//       });





//     this.setState({
//       loading: false,
//     });


//     let error;
//     let errors;

//     if (result instanceof Error) {
//       error = result.message;
//       // throw(result);
//     }
//     else {
//       const {
//         // data: resultData,
//         response,
//       } = result.data || {};

//       // const {
//       //   response,
//       // } = resultData || {};



//       let {
//         success,
//         message,
//         errors: responseErrors,
//         ...other
//       } = response || {};

//       errors = responseErrors;

//       if (success !== undefined) {

//         // success = true;

//         if (!success) {

//           error = message || "Request error";

//           // errors && errors.map(error => {
//           //   this.addError(error);
//           // });


//         }
//       }



//     }



//     this.setState({
//       errors,
//     });

//     if (error) {
//       this.addError(error);
//       throw (result);
//     }
//     else {
//       this.setState({
//         error: null,
//       });
//     }

//     return result;

//   }

//   reloadApiData() {

//     const {
//       loadApiData,
//     } = this.context;

//     return loadApiData();

//   }


//   renderField(field) {

//     if (!field) {
//       return null;
//     }


//     let {
//       errors,
//     } = this.state;

//     const {
//       type: Type,
//       props: {
//         name,
//         helperText,
//         onFocus,
//       },
//     } = field;




//     const error = errors ? errors.find(n => n.key === name) : null;

//     return <Type
//       {...field.props}
//       error={error ? true : false}
//       helperText={error && error.message ? error.message : helperText}
//       onFocus={event => {

//         if (errors && error) {
//           const index = errors.indexOf(error);
//           errors.splice(index, 1);
//           this.forceUpdate();
//         }

//         return onFocus ? onFocus(event) : null;
//       }}
//     />

//   }


//   getHistory() {
//     const {
//       router: {
//         history,
//       },
//     } = this.context;

//     return history;
//   }

//   getLocation() {

//     const {
//       location,
//     } = this.getHistory();

//     return location;
//   }

//   getLocationUri() {

//     const {
//       pathname,
//       search,
//     } = this.getLocation();

//     return new URI(`${pathname}${search}`);

//   }

//   getLocationQuery(field) {

//     return this.getLocationUri().query(true)[field];
//   }


//   onFilterFieldChange(event){

//     const {
//       name,
//       value,
//     } = event.target;


//     this.setFilters({
//       [name]: value ? value : undefined,
//     });

//   }


//   setFilters(data){

//     let uri = this.getLocationUri();
//     let query = uri.query(true);

//     Object.assign(query, {
//       ...data,
//       page: undefined,
//     });

//     uri.query(query);

//     const history = this.getHistory();




//     history.push(uri.toString());



//   }


//   /**
//    * Простая проверка выставлены ли фильтры или нет
//    */
//   hasFilters(){

//     // const {
//     //   search,
//     // } = this.getLocation();

//     // let {
//     //   page,
//     //   ...query
//     // } = this.getLocationUri().query(true);

//     const filters = this.getFilters();



//     return Object.keys(filters).length > 0 ? true : false;
//   }


//   /**
//    * Получаем фильтры из адресной строки
//    */
//   getFilters(){

//     let {
//       page,
//       ...filters
//     } = this.getLocationUri().query(true);



//     return filters;
//   }

//   addFilterCondition(where, key, value){
//     return Object.assign(where, {
//       [key]: value,
//     });
//   }


//   cleanFilters(){

//     const {
//       search,
//       pathname,
//     } = this.getLocation();

//     const history = this.getHistory();

//     history.push(pathname);

//   }


//   render(content) {

//     const {
//       error,
//     } = this.state;

//     return (
//       <Fragment>

//         {content}


//         <Snackbar
//           opened={error ? true : false}
//           message={error || ""}
//           close={() => {
//             this.setState({
//               error: null,
//             })
//           }}
//         />

//       </Fragment>
//     )
//   }
// }
