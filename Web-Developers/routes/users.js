var express = require('express');
var router = express.Router();

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

// add authentication start


var path = require('path');
var env = require('dotenv').config();
const Client = require('pg').Client;
const client = (()=>{

  if(process.env.NODE_ENV !=='production'){

    return new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: false
    });
  }
  else{

    return new Client({

      connectionString: process.env.DATABASE_URL,
      ssl: {

        rejectUnauthorized: false
      }
    });
  }
})();
client.connect();

var passport = require('passport');
var bcrypt = require('bcryptjs');
//const { user } = require('pg/lib/defaults');

router.get('/logout', function(req, res){

  req.logout(); // passport provide 
  res.redirect('/'); // redirected to the main page
});


// go to the next page if user existes
function loggedIn(req, res,next){

  if(req.user){

    next(); // req.user exists, go to the next page
  }
  else{

    res.redirect('users/login'); // user does'not exist stay in the same page
  }
}

router.get('/profile', loggedIn, function(req, res){

  res.sendFile(path.join(__dirname,'..', 'public','profile.html'));
});

// respond with this message when user loggedIn
function notLoggedIn(req, res, next){

  if(!req.user){

    next();
  }
  else{
    let fullname = req.user.fullname;
    let dob = req.user.dob;

    //res.redirect('/users/Info?name='+fullname);   

    res.redirect('/users/profile?name='+fullname);     // return the user fullname
  }
}


// localhost:3000/users/login



router.get('/login', notLoggedIn, function(req, res){

  res.sendFile(path.join(__dirname,'..', 'public', 'login.html'));
});

// login post

router.post('/login',

 // here the authentication happen form app.js

 passport.authenticate('local', {failureRedirect: 'login?message=Username+or+password+is+incrorrect.', failureFlash: true}),

 function(req, res, next){

   let fullname = req.user.fullname;
   console.log('fullname:' + fullname);
   let dob = req.user.dob;

 // because every four year's is a leep year and we used to fixed method in the userDays() function which will round the number of the year's every four year's
  

    // add return the user info

     let fullyearDays = 365.15; // because I called tofix() function which will rount the years every four year's
     let returnMonthsInstance = new Date();
 
 //function daysInCurrentYear(){

   let currentDayOfYear =0;
   
   let allMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   allMonths[0] = 31;
   allMonths[1] = 28;
   allMonths[2] = 31;
   allMonths[3] = 30;
   allMonths[4] = 31;
   allMonths[5] = 30;
   allMonths[6] = 31;
   allMonths[7] = 31;
   allMonths[8] = 30;
   allMonths[9] = 31;
   allMonths[10] = 30;
   allMonths[11] = 31;

  // we don't want to count the current month
  // getDay() return the return the numbers  of  the weeks
  // getDate() return the number of the current day in a month
   for(let i=0; i< returnMonthsInstance.getMonth(); i++ ){

    currentDayOfYear+= allMonths[i];

   }
   //console.log('curent day of year ' + returnMonthsInstance.getDate());
   //console.log('return currentDayOfyear ' + currentDayOfYear);

  //return  currentDayOfYear + returnMonthsInstance.getDate();
  
   daysIntheCurrentYear = currentDayOfYear + returnMonthsInstance.getDate();

    //console.log('DAYS IN THE CURRENT YEAR: '+daysIntheCurrentYear);

 //}


function myNextBirthday(){

  
  //let dob = req.user.dob;


  let date = new Date();
  console.log("date: "+ date);

  //let dob = req.user.dob;

  let todayDayOfWeek = date.getDay();
  console.log('todayDayOfWeek: '+ todayDayOfWeek);

  let currentMonth = date.getMonth();
  console.log('currentMonth: '+ currentMonth);

  let currentDayOfMonth = date.getDate();
  console.log('CurrentDayOfMonth: '+currentDayOfMonth);

  let totalDaysOfCurrentMonth = allMonths[currentMonth];
  console.log('totalDaysOfcurrentMonth: '+ totalDaysOfCurrentMonth);

  let subtraction = totalDaysOfCurrentMonth - currentDayOfMonth;
  console.log('subtraction: '+ subtraction);

   let Days = 0;

 if(dob.getMonth() > date.getMonth()){

  
   let value = date.getMonth() + 1;
   console.log('value: '+ value);

  for(let i = value; i< dob.getMonth(); i++){

   Days +=allMonths[i];
  
     }
      console.log('Days: '+ Days);
   }
   
  let allDays = (Days + dob.getDate()) + (todayDayOfWeek + subtraction);
  console.log('AllDays: '+ allDays);


  let result = allDays % 7;


  return allWeeks[result]

}
 


  
/*function nextBirtday(){

  let test = document.getElementByI('example1');
   const allWeeks=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  
   let currentDayOfWeek = returnMonthsInstance.getDay();

  

   if(dob.getMonth()>returnMonthsInstance.getMonth()){

   let userBirdayMonth = dob.getMonth()-1;
   console.log("userBirdayMonth: "+userBirdayMonth); 
  
   let monthsLeft = userBirdayMonth - returnMonthsInstance.getMonth();
   console.log('MonthsLeft: '+ monthsLeft);

   let multiplication = monthsLeft * 30.5;
    console.log('Multiplication: '+ multiplication);

    let arrayDays= allMonths[returnMonthsInstance.getMonth()] - returnMonthsInstance.getDate();
    console.log('arrayDays :'+ arrayDays);

    let birth =(dob.getDate() + arrayDays) + multiplication;
    console.log('birth '+ birth);

    let totalD = birth;

    console.log('todalD: '+ totalD);

    let result = (totalD + currentDayOfWeek) %7;

    console.log('Result: '+ result);

    return allWeeks[result.toFixed(0)];
    
   } 

} */
 function userBirthdayInfo(){


 }


function userHours(){

  let hours = userDays()* 24;   

  return hours.toFixed(0); //  to convert it back to days divide it by 24

}

function userMinutes(){

  let minutes = userHours()*60;

   return minutes.toFixed(0); // to convert it back to hours minuts/60


}

function userSeconds(){

let seconds = userMinutes()* 60; 

return seconds.toFixed(0); // to convert it back to minuts seconds/60
}

// day funck
function userDays(){   // to convert days back to year divide the number's of day by 365

 let numberOfDays = userYears() * fullyearDays
 //console.log('number of the days')
//console.log('Dob.getMonth '+ dob.getMonth());
//console.log('returnMonthsInstance.getMonth '+ returnMonthsInstance.getMonth());
//console.log('Dob.getDate '+ dob.getDate());
//console.log('returnMonthsInstance '+ returnMonthsInstance.getDate());
//console.log('allMonts.getDate '+ allMonths[returnMonthsInstance.getMonth()]);

if(dob.getMonth() < returnMonthsInstance.getMonth() && dob.getDate()< returnMonthsInstance.getDate()){

 let age = numberOfDays;
 //console.log('age: '+ age);

 let months = returnMonthsInstance.getMonth() - dob.getDate();
 //console.log('months: '+ months);

 let monthSome = months * 30.15;
 //console.log('monthSome '+monthSome);

 let day = returnMonthsInstance.getDate() - dob.getDate();
 //console.log('day: '+ day)

 let totaldays = age + monthSome + day;
 //console.log('totaldays: '+totaldays);

 return totaldays.toFixed(0);

}

else if(dob.getMonth() === returnMonthsInstance.getMonth() && dob.getDate() > returnMonthsInstance.getDate()){

 let dates = fullyearDays - dob.getDate() + returnMonthsInstance.getDate();
 //console.log('Dates: '+ dates);
 let results = numberOfDays + dates;
 //console.log("results: "+ results);

 return results.toFixed(0);

}
else if(dob.getMonth()===returnMonthsInstance.getMonth() && dob.getDate()< returnMonthsInstance.getDate()){

 let date = returnMonthsInstance.getMonth(); 
 //console.log("date: "+ date);
 let arrayDay = returnMonthsInstance.getDate();
 // console.log("arrayDay: "+ arrayDay);
  let result = arrayDay - dob.getDate();
 // console.log('result: ' + result);
 
 let totalDays = result + numberOfDays;
  return totalDays.toFixed(0);

   }

else if(dob.getMonth()> returnMonthsInstance.getMonth()){
  let age = numberOfDays;
  //console.log("age: "+ age);

  let numberOfMonths = 11- dob.getMonth();    // 11 because computer start count at 0
   //console.log('NumberOfMonths: '+ numberOfMonths);

  let arrayMonth = allMonths[dob.getMonth()];
   //console.log("arrayMonth: "+ arrayMonth);

   let some = (numberOfMonths * 30.5) + arrayMonth - dob.getDate();
   console.log('some: '+ some);

   let result = age + some + daysIntheCurrentYear;
  // console.log('result: '+ result);
   return result.toFixed(0);
}
   else{

    
     return 0;
     
   }
}
// weeks func
function userWeeks(){

  weeks = userDays()/7;
  return weeks.toFixed(0);  // convert back to year weeks/52

}
// month func
 function userMonths(){  // to convert months back to year divide number of months by 12

 
 let months = userDays()/ 31;

 
 return months.toFixed(0);  

 }

 // year func
function userYears(){

 
let uyear = dob.getFullYear();
let currentYear = new Date();
let result = currentYear.getFullYear()-uyear;


if(dob.getFullYear()===currentYear.getFullYear()){

 console.log('zero years old cannot create an account.')
 return result ;

}
else if(dob.getMonth()===currentYear.getMonth() && dob.getDate() > currentYear.getDate()){

  console.log('Couple days for your birthday');
  return result-1; 
}

else if(dob.getMonth()===currentYear.getMonth() && dob.getDate()===currentYear.getDate()){

    console.log("happy birthday");
   return  result;
   
  }

 else if(dob.getMonth() > currentYear.getMonth()){

    console.log('one or more month for your birthday')
   return result - 1;
  }

  else{

    console.log('your birthday was one or few months ago')
    return result ;
  }

}
   res.redirect('/users/profile?name=Hey '+ fullname+' according to your birthday date\
  . '+dob +'<br> You are '+userYears()+'  years old <br> You have been alive for approximately: <br> '+ userMonths()+' months,\
     <br>'+ userWeeks()+' Weeks, <br>'+userDays()+' days,<br>'+userHours()+' Hours, <br>'+userMinutes()+' minutes, <br>'+ userSeconds()+'\
      seconds. <br>' + 'According to your day of birth your next birthday will be on: '+ myNextBirthday()+  '<br> Current days in the year: '+ daysIntheCurrentYear); // the name is an id in the profele.html

      // 'your next birthday day will be on: '+nextBirtday() 

 });

// working in check next birthday start

router.get('/nextBirthday', function(req, res, next){

  res.sendFile(path.join(__dirname, '..','public','nextBirthday.html'));
});


 // months
 let currentDayOfYear =0;
   
   let allMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   allMonths[0] = 31;
   allMonths[1] = 28;
   allMonths[2] = 31;
   allMonths[3] = 30;
   allMonths[4] = 31;
   allMonths[5] = 30;
   allMonths[6] = 31;
   allMonths[7] = 31;
   allMonths[8] = 30;
   allMonths[9] = 31;
   allMonths[10] = 30;
   allMonths[11] = 31;


  // Days of the week 
   const allWeeks=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  

router.post('/nextBirthday', function(req, res, next){

   let do1 = req.user.dob;

  //let dob = req.user.dob;

  let fullname = req.user.fullname;

  /*function myNextBirthday(){

  
  let dob = req.user.dob;

  return dob.getDate();

  let date = new Date();
  console.log("date: "+ date);

  //let dob = req.user.dob;

  let todayDayOfWeek = date.getDay();
  console.log('todayDayOfWeek: '+ todayDayOfWeek);

  let currentMonth = date.getMonth();
  console.log('currentMonth: '+ currentMonth);

  let currentDayOfMonth = date.getDate();
  console.log('CurrentDayOfMonth: '+currentDayOfMonth);

  let totalDaysOfCurrentMonth = allMonths[currentMonth];
  console.log('totalDaysOfcurrentMonth: '+ totalDaysOfCurrentMonth);

  let subtraction = totalDaysOfCurrentMonth - currentDayOfMonth;
  console.log('subtraction: '+ subtraction);

   let Days = 0;

 if(dob.getMonth() > date.getMonth()){

  
   let value = date.getMonth + 1;
   console.log('value: '+ value);

  for(let i = value; i< dob.getMonth; i++){

   Days +=allMonths[i];
   console.log('Days: '+ Days);
     }
   }
  let allDays = (Days + dob.getDate()) + (todayDayOfWeek + subtraction);
  console.log('AllDays: '+ allDays);

  let result = allDays % 7;

 console.log('result: '+ result);
  return allWeeks[result]; */
 // }
  let d = new Date();
  let x = req.user.dob;
  

  res.redirect('/users/nextBirthday?dob=Hey '+ fullname +' according to your day of birth: '+ x.getFullYear())


}); 



// end
 // sign up get

 router.get('/signup', function(req, res){

   if(req.user){

     let fullname = req.user.fullname;

     return res.redirect('/users/profile?name='+fullname);
   }
   res.sendFile(path.join(__dirname,'..', 'public', 'signup.html'));
 });

 // Creating new User in the database

 function newUser(req, res, next){

   var salt = bcrypt.genSaltSync(10);
   var password = bcrypt.hashSync(req.body.password, salt); // the new password that user create

   client.query('INSERT INTO usersinfo (username, password, fullname, dob) VALUES($1, $2, $3, $4)', [req.body.username, password, req.body.fullname, req.body.dob], function(err, result){

     if(err){

       console.log('cannot insert new user');

       return next(err);
     }
     console.log('seccessfull created');

     res.redirect('/users/login?message=created+new+user+successfully+welcome.');
   });
 }

 // sign up post

 router.post('/signup', function(req, res, next){

   client.query('SELECT * FROM usersinfo WHERE username=$1', [req.body.username], function(err, result){

     if(err){

       console.log('an spl error');
       next(err);
     }
     else if(result.rows.length > 0){

       console.log("There a user with the same name");

       res.redirect('/users/signup?error=An+user+exists+with+the+same+name');
     }
     else{

       console.log('ready to add new user');

       newUser(req, res, next);
     }
   });
 });

 // forget password get

 router.get('/forgetPassword', function(req, res, next){

   res.sendFile(path.join(__dirname,'..','public','forgetPassword.html'));
 });

// i need to create a new function here for change Forget password


  function newPassword( req, res, next){

    var salt = bcrypt.genSaltSync(10);

    var password = bcrypt.hashSync(req.body.password, salt);

    //var password = bcrypt.hashSync(req.body.password, salt);

   

    //var update = `UPDATE usersinfo SET password=$1 WHERE username=$2`;

     client.query('UPDATE usersinfo SET password=$1 WHERE username=$2',[password, req.body.username],function(err, result){

      if(err){

        console.log('unable to change password Query error');
        return next(err);
      }

      console.log('Seccessfull created new password');

       res.redirect('/users/login?message=Create+new+password+successfully!');

   
    });
  }
// forget password post

router.post('/forgetPassword', function(req, res, next){

  client.query('SELECT * FROM usersinfo WHERE username=$1', [req.body.username], function(err, result){

    if(err){

      console.log('Error in SQL')
      next(err);
    }

    else if(result.rows. length > 0){

      console.log('this user exists');

      newPassword(req, res, next);

    //  res.redirect('/users/login?message=Create+new+password+successfully!');
    }

    else{

      console.log("There no one with this user name");
       
      res.redirect('/users/forgetPassword?error=There+no+One+with+this+username');
    }
  });
});


// get info




router.get('/Info', function(req, res, next){

  if(req.user){

     let dob = req.user.dob;

    let fullname = req.user.fullname;

    let username = req.user.username;

   let password = req.user.password;
  

    return res.redirect('/users/profile?name=Fullname: '+fullname+ '</br>' +' Day+Of+Birth:   '+dob+ '<br>'+'Username: ' +username);

      //return res.redirect('/users/Info?name=Fullname: '+fullname);
   }
 res.sendFile(path.join(__dirname,'..','public','Info.html'));

});

// info post

router.post('/Info', function(req, res, nex){

 
 
// let fullname = req.user.fullname;
 console.log('fullname: '+ fullname);

res.redirect('/users/Info?name=Fullname: '+fullname);
});


// localhost timeManagement get

router.get('/TimeManagement', function(req, res, next){

res.sendFile(path.join(__dirname,'..','public','TimeManagement.html'));
});

function newDate(req, res, next){


 client.query('INSERT INTO userstime (username,day,screentime,workout,reading,selfcare,sleep,pray,fun,work, description) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[ req.body.username,req.body.day, req.body.screentime,req.body.workout,req.body.reading,req.body.selfcare,req.body.sleep,req.body.pray,req.body.fun,req.body.work, req.body.description], function(err, result){
      
  //client.query('INSERT INTO userstime (username,day,screentime,workout,reading,selfcare,sleep,pray,fun,work) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[ req.body.username,req.body.day, req.body.screentime,req.body.workout,req.body.reading,req.body.selfcare,req.body.sleep,req.body.pray,req.body.fun,req.body.work], function(err, result){

    if(err){

    console.log('query insert error');
    return next(err);
    }
    console.log('Great job checking your management.')
    res.redirect('/users/TimeManagement?message="Thank+you+for+share+your+time+with+us!');
  });
} 



// post TimeManagement

router.post('/TimeManagement', function(req, res, next){

  //let fullname = req.user.fullname;
   //res.redirect('/users/TimeManagement?message=Hey '+ fullname);

  client.query('SELECT * FROM usersinfo WHERE username=$1',[req.body.username], function(err, result){


    if(err){

      console.log('sql err');
      next(err);
    }
   if(result.rows.length > 0){

     console.log('this user exists in userinfo database');
     newDate(req, res, next);

      }
      else{

         console.log('Theres no one with this user name in Usersinfo')
    res.redirect('/users/TimeManagement?message=+There+is+no+one+with+this+user+name+in+Databae!');
     
      }
  });
});


// localhost time overview get


router.get('/timeoverView', function(req, res, next){

  res.sendFile(path.join(__dirname,'..','public','timeoverView.html'));
});

 router.get('/timeoverViewOut', function(req, res, next){

  client.query('SELECT * FROM userstime  WHERE username=$1', [req.user.username], function(err, result){
  
  //client.query('SELECT * FROM userstime ', function(err, result){

    if(err){

      console.log('users sql error');
      next(err);
    }
    else if( result.rows.length > 0){
      console.log(' dates exist');
      res.json(result.rows);
     
    }
    else{
      console.log('There not record with this date');

      let username = req.user.username;
      res.redirect('/users/timeoverView?message='+username+'Not in the Database');
    }
  });
}); 

router.post('/timeoverView', function(req, res, next){


  let name = req.user.username;
  client.query('SELECT * FROM userstime  WHERE username=$1', [req.body.username], function(err, result){

    if(err){

      console.log("sql error");

      next(err);
    }
    if(result.rows.length > 0){

      console.log('Chek your time')

      res.redirect('/users/timeoverView?message=Welcome '+ name);
      //res.json(result.rows);

    }

    else{

      console.log('We donot have any information with this username');

      res.redirect('/users/TimeManagement?message=We+do+not+have+any+record+with+this+username')
    }
  })
})
// end 




module.exports = router;
