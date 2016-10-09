var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var getConnection  = require('./connectionpool');

var sessionIdArr = [];

//***********************************************************

var end = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;
    var username = req.user.username
    //console.log(username)
    //console.log(user)

    sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId);

  getConnection(function (err, connection) {
    var datas = connection.query('SELECT persons2.*, history.*, history_review.*, testing.*, vision.*, hearing.*, physicalexam.* FROM persons2, history, history_review, testing, vision, hearing, physicalexam WHERE' + "'" + sessionId + "'" + '=persons2.sessionId AND' + "'" + sessionId + "'" + '=history.sessionId AND' + "'" + sessionId + "'" + '=history_review.sessionId AND' + "'" + sessionId + "'" + '=testing.sessionId AND' + "'" + sessionId + "'" + '=vision.sessionId AND' + "'" + sessionId + "'" + '=hearing.sessionId AND' + "'" + sessionId + "'" + '=physicalexam.sessionId',
      function(err, rows) {
          console.log('glasses: ' + rows[0].glasses)
      var corrected;
      if(rows[0].hearingaidright == '1' || rows[0].hearingaidleft == '1' || rows[0].hearingaidneither == '1') {
        corrected = '1';
      } else {
        corrected = '0';
      }

    connection.query('SELECT * FROM moreinfo WHERE username = ' + "'" + req.user.attributes.username + "'",
    function(err, moreInfoRows) {
        console.log(req.user.attributes.username)
        console.log(moreInfoRows[0])
        var whatWork = moreInfoRows[0].what;
        var md = '0';
        var DO = '0';
        var pa = '0';
        var ch = '0';
        var apn = '0';
        var op = '0';

    if(whatWork == 'md') {
        var md = '1';
        }

    if(whatWork == 'do') {
        var DO = '1';
        }

    if(whatWork == 'pa') {
        var pa = '1';
        }

    if(whatWork == 'ch') {
        var ch = '1';
        }

    if(whatWork == 'apn') {
        var apn = '1';
        }

     if(whatWork == 'op') {
        var op = '1';
        }



      var fs = require('fs');
      var pdfFiller = require('pdffiller');

      var sourcePDF = "medForm.pdf";
      // var destinationPDF =  "../../Desktop/watch8.pdf";
      var destinationPDF = "watch9.pdf";
      var shouldFlatten = false;




      var d = new Date();
      var monthFix = Number(d.getMonth()) + 1;
      var date = monthFix + "/" + d.getDate() + "/" + d.getFullYear();
      ////console.log(str);

      var avgRight = (parseInt(rows[0].right500) + parseInt(rows[0].right1000) + parseInt(rows[0].right2000)) / 3;
      var avgLeft = (parseInt(rows[0].left500) + parseInt(rows[0].left1000) + parseInt(rows[0].left2000)) / 3;


    if (user !== undefined) {
      user = user.toJSON();
    }

    connection.query('SELECT * from vision WHERE vision.sessionId = ' + "'" + sessionId + "'",
      function(err, rows4) {
      var visionObj = rows4[0]

      connection.query('SELECT * from hearing WHERE hearing.sessionId = ' + "'" + sessionId + "'",
        function(err, rows3) {
        var hearingObj = rows3[0]

        connection.query('SELECT * FROM testing WHERE testing.sessionId = ' + "'" + sessionId + "'",
          function(err, rows2) {
          var testingObj = rows2[0];

          connection.query('SELECT followUpBrainInjury, followUpEpilepsy, followUpEye, followUpEar, followUpHeart, followUpPacemaker, followupBloodPressure, followUpHighCholesterol, followUpBreathingProblems, followUpLungDisease, followUpKidneyProblems, followUpStomachProblems, followUpDiabetes, followUpInsulin, followUpAnxiety, followUpFainting, followUpDizziness, followUpUnExplainedWeightLoss, followUpStroke, followUpMissingLimbs, followUpBackProblems, followUpBoneProblems, followUpBloodClots, followUpCancer, followUpChronicDiseases, followUpSleepDisorders, followUpSleepTest, followUpNightInHospital, followUpBrokenBone, followUpUseTobacco, followUpDrinkAlcohol, followUpIllegalSubstance, followUpFailedDrugTest FROM history_review WHERE history_review.sessionId = ' + "'" + sessionId + "'",
            function(err, rows5) {

            var obj = rows5[0];
            console.log(rows5[0])


            var certificate_0 = "Due to missing limbs, with a SPE certificate, a maximum of 1 year certificate can be issued.";
            var certificate_1 = "Due to head/brain injuries, a neurologist's release is required and a maximum of 1 year certificate can be issued.";
            var certificate_2 = "Due to head/brain injuries, a maximum of 2 year certificate can be issued.";
            var certificate_3 = "Due to heart issues, a maximum of 1 year certificate can be issued after a two month wait period. A cardiologist release is needed and an exersize tolerance test must be administered every two years.";
            var certificate_4 = "Due to heart issues, a cardiologist release is needed. A maximum of 2 year certificate can be issued after a 3 month wait period. After 5 years, an annual ETT is required.";
            var certificate_5 = "Due to issues with a pacemaker, AV block / sinus node dysfunction, a maximum of one year certificate can be issued after a 1 month wait period.";
            var certificate_6 = "Due to issues with a pacemaker, ICD (defibrillator), the driver is disqualified.";
            var certificate_7 = "Due to seizures/epilepsy, a neurologist's release is required or there is a 10 year wait period before a certificate can be issued.";
            var certificate_8 = "Due to issues with a pacemaker, neurocardiogenic syncope, a maximum of one year certificate can be issued after a 3 month wait period.";
            var certificate_9 = "Due to lung issues, oxygen therapy, the driver is disqualified.";
            var certificate_10 = "Due to lung issues, cough syncope, the driver is disqualified.";
            var certificate_11 = "the patient is disqualified.";
            var certificate_12 = "Due to stroke issues, cerebellar or brainstem, a maximum of one year certificate can be issued after a one year wait period. A neurologist's release is also required.";
            var certificate_13 = "Due to stroke issues, cortical/subcortical, a maximum of one year certificate can be issued after a five year wait period. A neurologist's release is also required.";
            var certificate_14 = "Due to stroke issues, TIA, a maximum of 1 year certificate can be issued after a one year wait period."
            var certificate_15 = "Due to kidney issues, the patient is disqualified.";
            var certificate_16 = "Due to stomach issues, the patient is disqualified.";
            var certificate_17 = "Due to insulin use, the patient is disqualified.";
            var certificate_18 = "Due to anxiety issues, the patient is disqualified.";
            var certificate_19 = "Due to fainting issues, the patient is disqualified.";
            var certificate_20 = "Due to dizziness issues, the patient is disqualified.";
            var certificate_21 = "Due to unexplained weight loss, the patient is disqualified.";
            var certificate_22 = "Due to breathing issues, the patient is disqualified.";
            var certificate_23 = "Due to missing limbs, the patient is disqualified.";
            var certificate_24 = "Due to back/neck issues, the patient is disqualified.";
            var certificate_25 = "Due to bone issues, the patient is disqualified.";
            var certificate_26 = "Due to blood clot issues, the patient is disqualified.";
            var certificate_27 = "Due to cancer issues, the patient is disqualified.";
            var certificate_28 = "Due to infections/chronic diseases, the patient is disqualified.";
            var certificate_29 = "Due to sleep disorders, the patient is disqualified.";
            var certificate_30 = "Due to sleep test issues, the patient is disqualified.";
            var certificate_31 = "Due to hospital visits, the patient is disqualified.";
            var certificate_32 = "Due to broken bone issues, the patient is disqualified.";
            var certificate_33 = "Due to tobacco use, the patient is disqualified.";
            var certificate_34 = "Due to alcohol issues, the patient is disqualified.";
            var certificate_35 = "Due to illegal drug issues, the patient is disqualified.";
            var certificate_36 = "Due to failed drug test history, the patient is disqualified.";

            var filtered = [];
            for (prop in obj) {
              if (obj[prop] == 'undefined' || obj[prop] == 'na' || obj[prop] == '') {
              delete obj[prop]
              }else {
                filtered.push(obj[prop])
              }
            }

            console.log("filtered: " + filtered)

            for (i = 0; i < filtered.length; i++){

            }


            console.log(obj)

            // var disqualifiedState;
            // var disqualified;
            var dqArr = [];
            var certArr = [];
            var arr = [];
            var timeline = [];
            var reason = '';

            for (i = 0; i < filtered.length; i++) {
              if(filtered[i] == "valueZero") {
                arr.push(certificate_0);
                timeline.push(certificate_0);
                certArr.push(3);

              }
              if(filtered[i] == "valueOne") {
                arr.push(certificate_1);
                timeline.push(certificate_1);
                certArr.push(3);
              }
              if(filtered[i] == "valueTwo") {
                arr.push(certificate_2)
                timeline.push(certificate_2)
              }
              if(filtered[i] == "valueThree") {
                arr.push(certificate_3)
                timeline.push(certificate_3)
                dqArr.push(0)
              }
              if(filtered[i] == "valueFour") {
                arr.push(certificate_4)
                timeline.push(certificate_4)
                dqArr.push(0)
                reason += "heart issues / ";
              }
              if(filtered[i] == "valueFive") {
                arr.push(certificate_5)
                timeline.push(certificate_5)
                certArr.push(3);
              }
              if(filtered[i] == "valueSix") {
                arr.push(certificate_6)
                timeline.push(certificate_6)
                dqArr.push(0)
                reason += "pacemaker, ICD (defibrillator) / ";
              }
              if(filtered[i] == "valueSeven") {
                arr.push(certificate_7)
                timeline.push(certificate_7)
                dqArr.push(0)
              }
              if(filtered[i] == "valueEight") {
                arr.push(certificate_8)
                timeline.push(certificate_8)
                certArr.push(3);
              }
              if(filtered[i] == "valueNine") {
                arr.push(certificate_9)
                timeline.push(certificate_9)
                dqArr.push(0)
                reason += "lung issues, oxygen therapy / "
              }
              if(filtered[i] == "valueTen") {
                arr.push(certificate_10)
                timeline.push(certificate_10)
                dqArr.push(0)
                reason += "lung issues, cough syncope / "
              }
              if(filtered[i] == "valueTwelve") {
                arr.push(certificate_12)
                timeline.push(certificate_12)
                certArr.push(3);
              }
              if(filtered[i] == "valueThirteen") {
                arr.push(certificate_13)
                timeline.push(certificate_13)
                dqArr.push(0)
              }
              if(filtered[i] == "valueFourteen") {
                arr.push(certificate_14)
                timeline.push(certificate_14)
                dqArr.push(0)
              }
              if(filtered[i] == "valueFifteen") {
                arr.push(certificate_15)
                timeline.push(certificate_15)
                dqArr.push(0)
                reason += "kidney issues / "
              }
              if(filtered[i] == "valueSixteen") {
                arr.push(certificate_16)
                timeline.push(certificate_16)
                dqArr.push(0)
                reason += "stomach issues / "
              }
              if(filtered[i] == "valueSeventeen") {
                arr.push(certificate_17)
                timeline.push(certificate_17)
                dqArr.push(0)
                reason += "insulin use / "
              }
              if(filtered[i] == "valueEighteen") {
                arr.push(certificate_18)
                timeline.push(certificate_18)
                dqArr.push(0)
                reason += "anxiety issues / "
              }
              if(filtered[i] == "valueNineteen") {
                arr.push(certificate_19)
                timeline.push(certificate_19)
                dqArr.push(0)
                reason += "fainting issues / "
              }
              if(filtered[i] == "valueTwenty") {
                arr.push(certificate_20)
                timeline.push(certificate_20)
                dqArr.push(0)
                reason += "dizziness issues / "
              }
              if(filtered[i] == "valueTwentyOne") {
                arr.push(certificate_21)
                timeline.push(certificate_21)
                dqArr.push(0)
                reason += "unexplained weight loss / "
              }
              if(filtered[i] == "valueTwentyTwo") {
                arr.push(certificate_22)
                timeline.push(certificate_22)
                dqArr.push(0)
                reason += "breathing issues / "
              }
              if(filtered[i] == "valueTwentyThree") {
                arr.push(certificate_23)
                timeline.push(certificate_23)
                dqArr.push(0)
                reason += "missing limbs / "
              }
              if(filtered[i] == "valueTwentyFour") {
                arr.push(certificate_24)
                timeline.push(certificate_24)
                dqArr.push(0)
                reason += "back issues / "
              }
              if(filtered[i] == "valueTwentyFive") {
                arr.push(certificate_25)
                timeline.push(certificate_25)
                dqArr.push(0)
                reason += "bone issues / "
              }
              if(filtered[i] == "valueTwentySix") {
                arr.push(certificate_26)
                timeline.push(certificate_26)
                dqArr.push(0)
                reason += "bloodclot issues / "
              }
              if(filtered[i] == "valueTwentySeven") {
                arr.push(certificate_27)
                timeline.push(certificate_27)
                dqArr.push(0)
                reason += "cancer issues / "
              }
              if(filtered[i] == "valueTwentyEight") {
                arr.push(certificate_28)
                timeline.push(certificate_28)
                dqArr.push(0)
                reason += "infections or chronic diseases / "
              }
              if(filtered[i] == "valueTwentyNine") {
                arr.push(certificate_29)
                timeline.push(certificate_29)
                dqArr.push(0)
                reason += "sleep disorders / "
              }
              if(filtered[i] == "valueThirty") {
                arr.push(certificate_30)
                timeline.push(certificate_30)
                dqArr.push(0)
                reason += "sleep test results / "
              }
              if(filtered[i] == "valueThirtyOne") {
                arr.push(certificate_31)
                timeline.push(certificate_31)
                dqArr.push(0)
                reason += "hospital visits / "
              }
              if(filtered[i] == "valueThirtyTwo") {
                arr.push(certificate_32)
                timeline.push(certificate_32)
                dqArr.push(0)
                reason += "broken bones / "
              }
              if(filtered[i] == "valueThirtyThree") {
                arr.push(certificate_33)
                timeline.push(certificate_33)
                dqArr.push(0)
                reason += "tobacco use / "
              }
              if(filtered[i] == "valueThirtyFour") {
                arr.push(certificate_34)
                timeline.push(certificate_34)
                dqArr.push(0)
                reason += "alcohol issues / "
              }
              if(filtered[i] == "valueThirtyFive") {
                arr.push(certificate_35)
                timeline.push(certificate_35)
                dqArr.push(0)
                reason += "illegal drugs / "
              }
              if(filtered[i] == "valueThirtySix") {
                arr.push(certificate_36)
                timeline.push(certificate_36)
                dqArr.push(0)
                reason += "failed drug test history / "
              }
            }

            //console.log("arr: " + arr)

            var bloodPressureIssue = '';
          if (parseInt(testingObj.systolic1) >= 140 &&
              parseInt(testingObj.systolic1) <= 159 &&
              parseInt(testingObj.systolic2) >= 140 &&
              parseInt(testingObj.systolic2) <= 159 ||
              parseInt(testingObj.diastolic1) >= 90 &&
              parseInt(testingObj.diastolic1) <= 99 &&
              parseInt(testingObj.diastolic2) >= 90 &&
              parseInt(testingObj.diastolic2) <= 99) {
              bloodPressureIssue = "Due to stage 1 hypertension, a 1 year certificate can be issued.";
              timeline.push(bloodPressureIssue)
            }

          if (parseInt(testingObj.systolic1) >= 160 &&
              parseInt(testingObj.systolic1) <= 179 &&
              parseInt(testingObj.systolic2) >= 160 &&
              parseInt(testingObj.systolic2) <= 179 ||
              parseInt(testingObj.diastolic1) >= 100 &&
              parseInt(testingObj.diastolic1) <= 109 &&
              parseInt(testingObj.diastolic2) >= 100 &&
              parseInt(testingObj.diastolic2) <= 109) {
              bloodPressureIssue = "Due to stage 2 hypertension, a 3 month certificate can be issued.";
              certArr.push(1)
              timeline.push(bloodPressureIssue)
            }

          if (parseInt(testingObj.systolic1) >= 180 &&
              parseInt(testingObj.systolic2) >= 180 ||
              parseInt(testingObj.diastolic1) >= 110 &&
              parseInt(testingObj.diastolic2) >= 110) {
              bloodPressureIssue = "Due to stage 3 hypertension, The driver may not be qualified, even temporarily, until reduced to 140/90 or less.";
              dqArr.push(0)
              timeline.push(bloodPressureIssue)
              reason += "stage 3 hypertension / "
            }

            var hearingIssue = '';
          if (parseInt(hearingObj.rightear) < 5 &&
              parseInt(hearingObj.leftear) < 5 &&
              parseInt(hearingObj.right500) < 40 ||
              parseInt(hearingObj.right1000) < 40 ||
              parseInt(hearingObj.right2000) < 40 ||
              parseInt(hearingObj.left500) < 40 ||
              parseInt(hearingObj.left1000) < 40 ||
              parseInt(hearingObj.left2000) < 40) {
              hearingIssue = "Due to hearing issues, the driver is disqualified."
              dqArr.push(0)
              timeline.push(bloodPressureIssue)
              reason += "hearing issues / "
            }

            var visionIssue = '';
          if (parseInt(visionObj.rightcorrected) > 40 ||
              parseInt(visionObj.rightuncorrected) > 40 ||
              parseInt(visionObj.leftcorrected) > 40 ||
              parseInt(visionObj.leftuncorrected) > 40 ||
              parseInt(visionObj.bothcorrected) > 40 ||
              parseInt(visionObj.bothuncorrected) > 40 ||
              parseInt(visionObj.fieldright) < 70 ||
              parseInt(visionObj.fieldleft) < 70 ){
              visionIssue = "Due to vision problems, the driver is disqualified."
              dqArr.push(0)
              timeline.push(bloodPressureIssue)
              reason += "vision issues / "
            }


            console.log("timeline: " + timeline)
            console.log("dqArr: " + dqArr)
            console.log("certArr: " + certArr)

            var historyCount = timeline.length;
            var dq;
            var dqState;
            var cert;

            if (dqArr.length == 0 && certArr.length == 0) {
              cert = 'x'
              dq = 1;
              dqState = 3;
            }

            if (dqArr.length != 0){
              cert = 'x';
              dq = 0;
              dqState = 0;
            }

            //var minUse = 1;

            if (dqArr.length == 0 && certArr.length != 0){

              var min = Math.min.apply(null, certArr)
              console.log("min: " + min)

              if(min == 1 || min == 3){
                cert = min;
              } else {
                cert = 'x'
              }

            }

            //console.log(timeline)

            //var cert = [];


            // for (i = 0; i < timeline.length; i++) {
            //   if(timeline[i] == "a maximum of 1 year certificate can be issued." ||
            //      timeline[i] == "a neurologist's release is required and a maximum of 1 year certificate can be issued." ||
            //      timeline[i] == "a maximum of 1 year certificate can be issued after a two month wait period. A cardiologist release is needed and an exersize tolerance test must be administered every two years."){
            //      cert.push(3)
            //   }

              // if(timeline[i] == "a maximum of 2 year certificate can be issued."){
              //   cert.push(2)
              // }

            //   if(timeline[i] == "Due to stage 2 hypertension, a 3 month certificate can be issued."){
            //     cert.push(1)
            //   }
            //   if(timeline[i] == "the patient is disqualified." ||
            //      timeline[i] == "cough syncope, the driver is disqualified." ||
            //      timeline[i] == "oxygen therapy, the driver is disqualified." ||
            //      timeline[i] == "ICD (defibrillator), the driver is disqualified." ||
            //      timeline[i] == "Due to vision problems, the driver is disqualified." ||
            //      timeline[i] == "Due to hearing issues, the driver is disqualified." ||
            //      timeline[i] == "Due to stage 3 hypertension, The driver may not be qualified, even temporarily, until reduced to 140/90 or less."
            //      ){
            //   disqualified = 0;
            //   disqualifiedState = 0;
            //   }
            // }

            // console.log("cert: " + cert)

            // if (disqualified != 0) {
            //   disqualified = 1;
            //   disqualifiedState = 3;
            // }

            // var min = Math.min.apply(null, cert) // 1
            // console.log("min: " + min)
            // var minUse;
            // if(min == 1 || min == 3){
            //   minUse = min;
            // }else {
            //   minUse = 'x'
            // }

            // console.log("minUse: " + minUse)
            // console.log("disqualified: " + disqualified)
            // console.log("disqualifiedState: " + disqualifiedState)
            // console.log("minUse: " + minUse)


            // if(disqualified == 0 || disqualified == 1){
            //   minUse = 'x';
            // }

            // if(disqualifiedState == 0 || disqualifiedState == 3){
            //   minUse = 'x';
            // }

            // console.log("minUse: " + minUse)
            // console.log("disqualified: " + disqualified)
            // console.log("disqualifiedState: " + disqualifiedState)
            // console.log("minUse: " + minUse)



            // var disqualifiedReason = [];
            // for (i = 0; i < timeline.length; i++) {
            //   if(timeline[i] == "cough syncope, the driver is disqualified."){
            //     disqualifiedReason.push("cough syncope")
            //   }
            //   if(timeline[i] == "oxygen therapy, the driver is disqualified."){
            //     disqualifiedReason.push("oxygen therapy")
            //   }
            //   if(timeline[i] == "ICD (defibrillator), the driver is disqualified."){
            //     disqualifiedReason.push("ICD (defibrillator)")
            //   }
            //   if(timeline[i] == "Due to vision problems, the driver is disqualified."){
            //     disqualifiedReason.push("vision issues")
            //   }
            //   if(timeline[i] == "Due to hearing issues, the driver is disqualified."){
            //     disqualifiedReason.push("hearing issues")
            //   }
            //   if(timeline[i] == "Due to stage 3 hypertension, The driver may not be qualified, even temporarily, until reduced to 140/90 or less."){
            //     disqualifiedReason.push("stage 3 hypertension")
            //   }
            // }

//***************** LOOP THROUGH ALL DISQUALIFIERS AND CONCATINATE  ****************

            // var dqReasonUse = '';
            // for (i = 0; i < disqualifiedReason.length; i++){
            //   dqReasonUse += disqualifiedReason[i] + ' / '
            // }




      var data = {
        "MCSA-5875[0].Page1[0].privacyStatement[0].privacyDate[0]": date,
        "MCSA-5875[0].Page1[0].medRecord[0].medNumber[0]": moreInfoRows[0].medicalNumber,
        "MCSA-5875[0].Page1[0].driverPersonal[0].nameLast[0]": rows[0].lastname,
        "MCSA-5875[0].Page1[0].driverPersonal[0].nameFirst[0]": rows[0].firstname,
        "MCSA-5875[0].Page1[0].driverPersonal[0].nameInitial[0]": rows[0].middlename,
        "MCSA-5875[0].Page1[0].driverPersonal[0].birthDate[0]": rows[0].dob,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverAge[0]": rows[0].age,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverAddress[0]": rows[0].streetaddress,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverCity[0]": rows[0].city,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverState[0]": rows[0].state,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverZip[0]": rows[0].zip,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverLicense[0]": rows[0].dln,
        "MCSA-5875[0].Page1[0].driverPersonal[0].licenseState[0]": rows[0].issuing,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverPhone[0]": rows[0].phone,
        "MCSA-5875[0].Page1[0].driverPersonal[0].genderGroup[0].genderButtons[0]": rows[0].gender,
        "MCSA-5875[0].Page1[0].driverPersonal[0].emailAddress[0]": rows[0].email,
        "MCSA-5875[0].Page1[0].driverPersonal[0].cdlLicense[0].cdlButtonList[0]": rows[0].holder,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverVerify[0]": rows[0].verified,
        "MCSA-5875[0].Page1[0].driverPersonal[0].certDenyGroup[0].certDenyButtons[0]": rows[0].denied,
        "MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryButtons[0]": rows[0].surgeryButton,
        "MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryDescribe[0]": rows[0].surgeryComments,
        "MCSA-5875[0].Page1[0].medicineGroup[0].medicineButtons[0]": rows[0].medicationButton,
        "MCSA-5875[0].Page1[0].medicineGroup[0].medicineDescribe[0]": rows[0].medicationComments,
        "MCSA-5875[0].Page1[0].attachButton[0]": "",
        "MCSA-5875[0].Page2[0].pageHead2[0].nameLastHead2[0]": rows[0].lastname,
        "MCSA-5875[0].Page2[0].pageHead2[0].nameFirstHead2[0]": rows[0].firstname,
        "MCSA-5875[0].Page2[0].pageHead2[0].nameInitialHead2[0]": rows[0].middlename,
        "MCSA-5875[0].Page2[0].pageHead2[0].dateBirth2[0]": rows[0].dob,
        "MCSA-5875[0].Page2[0].pageHead2[0].dateForm2[0]": date,
        "MCSA-5875[0].Page2[0].driverHealth[0].headGroup[0].headButtons[0]": rows[0].brainInjuries,
        "MCSA-5875[0].Page2[0].driverHealth[0].seizeGroup[0].seizeButtons[0]": rows[0].seizures,
        "MCSA-5875[0].Page2[0].driverHealth[0].eyeGroup[0].eyeButtons[0]": rows[0].eyeProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].earGroup[0].earButtons[0]": rows[0].earProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].heartGroup[0].heartButtons[0]": rows[0].heartProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].paceGroup[0].paceButtons[0]": rows[0].paceMaker,
        "MCSA-5875[0].Page2[0].driverHealth[0].highGroup[0].highButtons[0]": rows[0].highBloodPressure,
        "MCSA-5875[0].Page2[0].driverHealth[0].cholesterolGroup[0].cholesterolButtons[0]": rows[0].highCholesterol,
        "MCSA-5875[0].Page2[0].driverHealth[0].breathGroup[0].breathButtons[0]": rows[0].breathingProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].lungGroup[0].lungButtons[0]": rows[0].lungDisease,
        "MCSA-5875[0].Page2[0].driverHealth[0].kidneyGroup[0].kidneyButtons[0]": rows[0].kidneyProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].stomachGroup[0].stomachButtons[0]": rows[0].stomachProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].sugarGroup[0].sugarButtons[0]": rows[0].diabetes,
        "MCSA-5875[0].Page2[0].driverHealth[0].insulinGroup[0].insulinButtons[0]": rows[0].insulin,
        "MCSA-5875[0].Page2[0].driverHealth[0].mentalGroup[0].mentalButtons[0]": rows[0].anxiety,
        "MCSA-5875[0].Page2[0].driverHealth[0].faintGroup[0].faintButtons[0]": rows[0].fainting,
        "MCSA-5875[0].Page2[0].driverHealth[0].dizzyGroup[0].dizzyButtons[0]": rows[0].dizziness,
        "MCSA-5875[0].Page2[0].driverHealth[0].weightGroup[0].weightButtons[0]": rows[0].unexplainedWeightLoss,
        "MCSA-5875[0].Page2[0].driverHealth[0].strokeGroup[0].strokeButtons[0]": rows[0].stroke,
        "MCSA-5875[0].Page2[0].driverHealth[0].uselimitGroup[0].uselimitButtons[0]": rows[0].missingLimbs,
        "MCSA-5875[0].Page2[0].driverHealth[0].neckbackGroup[0].neckbackButtons[0]": rows[0].backProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].boneGroup[0].boneButtons[0]": rows[0].boneProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].bloodGroup[0].bloodButtons[0]": rows[0].bloodClots,
        "MCSA-5875[0].Page2[0].driverHealth[0].cancerGroup[0].cancerButtons[0]": rows[0].cancer,
        "MCSA-5875[0].Page2[0].driverHealth[0].infectGroup[0].infectButtons[0]": rows[0].chronicDiseases,
        "MCSA-5875[0].Page2[0].driverHealth[0].apneaGroup[0].apneaButtons[0]": rows[0].sleepDisorders,
        "MCSA-5875[0].Page2[0].driverHealth[0].sleeptestGroup[0].sleeptestButtons[0]": rows[0].sleepTest,
        "MCSA-5875[0].Page2[0].driverHealth[0].hospitalGroup[0].hospitalButtons[0]": rows[0].nightInHospital,
        "MCSA-5875[0].Page2[0].driverHealth[0].brokenGroup[0].brokenButtons[0]": rows[0].brokenBone,
        "MCSA-5875[0].Page2[0].driverHealth[0].tobaccoGroup[0].tobaccoButtons[0]": rows[0].useTobacco,
        "MCSA-5875[0].Page2[0].driverHealth[0].alcoholGroup[0].alcoholButtons[0]": rows[0].drinkAlcohol,
        "MCSA-5875[0].Page2[0].driverHealth[0].illegalGroup[0].illegalButtons[0]": rows[0].illegalSubstance,
        "MCSA-5875[0].Page2[0].driverHealth[0].failedGroup[0].failedButtons[0]": rows[0].failedDrugTest,
        "MCSA-5875[0].Page2[0].otherGroup[0].otherButtons[0]": rows[0].otherButton,
        "MCSA-5875[0].Page2[0].otherGroup[0].otherDescribe[0]": rows[0].otherComments,
        "MCSA-5875[0].Page2[0].commentGroup[0].commentButtons[0]": rows[0].yesButton,
        "MCSA-5875[0].Page2[0].commentGroup[0].commentDescribe[0]": rows[0].yesDescribe,
        "MCSA-5875[0].Page2[0].attachButton[0]": "",
        "MCSA-5875[0].Page2[0].driverSignature[0].signatureDate[0]": date,
        "MCSA-5875[0].Page2[0].#area[2].driveReview[0].examinerComment[0]": "rows[0].",
        "MCSA-5875[0].Page2[0].#area[2].driveReview[0].attachButton2[0]": "",
        "MCSA-5875[0].Page3[0].pageHead3[0].nameLastHead3[0]": rows[0].lastname,
        "MCSA-5875[0].Page3[0].pageHead3[0].nameFirstHead3[0]": rows[0].firstname,
        "MCSA-5875[0].Page3[0].pageHead3[0].nameInitialHead3[0]": rows[0].middlename,
        "MCSA-5875[0].Page3[0].pageHead3[0].dateBirth3[0]": rows[0].dob,
        "MCSA-5875[0].Page3[0].pageHead3[0].dateForm3[0]": date,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].pulseMeasure[0]": rows[0].pulserate,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].pulserhythmGroup[0].pulserhythmButtons[0]": rows[0].pulserhythm,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].#area[1].feetHeight[0]": rows[0].heightfeet,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].#area[1].inchesHeight[0]": rows[0].heightinches,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].#area[1].poundsWeight[0]": rows[0].weight,
        "MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row1[0].sitSys[0]": rows[0].systolic1,
        "MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row1[0].sitDias[0]": rows[0].diastolic1,
        "MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row2[0].secSys[0]": rows[0].systolic2,
        "MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row2[0].secDias[0]": rows[0].diastolic2,
        "MCSA-5875[0].Page3[0].driveTest[0].otherTesting[0]": rows[0].othertesting,
        "MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].spgrNumber[0]": rows[0].urinesp,
        "MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].proteinNumber[0]": rows[0].urineprotein,
        "MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].bloodNumber[0]": rows[0].urineblood,
        "MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].sugarNumber[0]": rows[0].urinesugar,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].uncorrectRight[0]": rows[0].rightuncorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].correctRight[0]": rows[0].rightcorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].fieldRight[0]": rows[0].fieldright,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].uncorrectLeft[0]": rows[0].leftuncorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].correctLeft[0]": rows[0].leftcorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].fieldLeft[0]": rows[0].fieldleft,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].uncorrectBoth[0]": rows[0].bothuncorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].correctBoth[0]": rows[0].bothcorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].distinguishGroup[0].distinguishButtons[0]": rows[0].traficlight,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].monocularGroup[0].monocularButtons[0]": rows[0].monocular,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].referredGroup[0].referredButtons[0]": rows[0].optometrist,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].documentGroup[0].documentButtons[0]": rows[0].documentation,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].hearingaidGroup[0].rightBox[0]": rows[0].hearingaidright,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].hearingaidGroup[0].leftBox[0]": rows[0].hearingaidleft,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].hearingaidGroup[0].nichtBox[0]": rows[0].hearingaidneither,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].whisperRight[0]": rows[0].rightear,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].whisperLeft[0]": rows[0].leftear,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].right500[0]": rows[0].right500,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].right1000[0]": rows[0].right1000,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].right2000[0]": rows[0].right2000,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].left500[0]": rows[0].left500,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].left1000[0]": rows[0].left1000,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].left2000[0]": rows[0].left2000,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].rightAverage[0]": avgRight,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].leftAverage[0]": avgLeft,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].generalButtons[0]": rows[0].general,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].skinButtons[0]": rows[0].skin,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].eyesButtons[0]": rows[0].eyes,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].earsButtons[0]": rows[0].ears,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].mouthButtons[0]": rows[0].mouth,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].heartButtons[0]": rows[0].cardiovascular,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].chestButtons[0]": rows[0].lungs,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].abdomenButtons[0]": rows[0].abdomen,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].herniaButtons[0]": rows[0].hernia,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].backButtons[0]": rows[0].back,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].jointsButtons[0]": rows[0].joints,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].neuroButtons[0]": rows[0].neuro,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].gaitButtons[0]": rows[0].gait,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].vascularButtons[0]": rows[0].vascular,
        "MCSA-5875[0].Page3[0].driveExam[0].examComment[0]": rows[0].examtextarea,
        "MCSA-5875[0].Page3[0].driveExam[0].attachButton3[0]": "",
        "MCSA-5875[0].Page4[0].pageHead4[0].nameLastHead4[0]": rows[0].lastname,
        "MCSA-5875[0].Page4[0].pageHead4[0].nameFirstHead4[0]": rows[0].firstname,
        "MCSA-5875[0].Page4[0].pageHead4[0].nameInitialHead4[0]": rows[0].middlename,
        "MCSA-5875[0].Page4[0].pageHead4[0].dateBirth4[0]": rows[0].dob,
        "MCSA-5875[0].Page4[0].pageHead4[0].dateForm4[0]": date,
        "MCSA-5875[0].Page4[0].fedDetermination[0].standardButtonList[0]": dq,
        "MCSA-5875[0].Page4[0].fedDetermination[0].notStandardsWhy[0]": reason,
        "MCSA-5875[0].Page4[0].fedDetermination[0].butStandardsWhy[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].qualifiedButtonList[0]": cert,
        "MCSA-5875[0].Page4[0].fedDetermination[0].otherQualify[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].restrictVary[0].correctLenses[0]": rows[0].glasses,
        "MCSA-5875[0].Page4[0].fedDetermination[0].restrictVary[0].hearingAid[0]": corrected,
        "MCSA-5875[0].Page4[0].fedDetermination[0].restrictVary[0].waiverQualify[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].restrictVary[0].waiverEnter[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].restrictVary[0].speQualify[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].restrictVary[0].cfrQualify[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].restrictVary[0].exemptQualify[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].incompleteButtonList[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].deterPending[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].pendingWhy[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].returnExam[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].returnDate[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].reportAmend[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].amendWhy[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].ifAmendDate[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].incompleteWhy[0]": "",
        "MCSA-5875[0].Page4[0].fedDetermination[0].examName[0]": moreInfoRows[0].fname + ' ' + moreInfoRows[0].lname,
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalAddress[0]": moreInfoRows[0].registerAddress,
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalCity[0]": moreInfoRows[0].registerCity,
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalState[0]": moreInfoRows[0].registerState,
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalZip[0]": moreInfoRows[0].registerZip,
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalPhone[0]": moreInfoRows[0].registerPhone,
        "MCSA-5875[0].Page4[0].fedDetermination[0].examDate[0]": date,
        "MCSA-5875[0].Page4[0].fedDetermination[0].certNumber[0]": moreInfoRows[0].stateLicense,
        "MCSA-5875[0].Page4[0].fedDetermination[0].issueState[0]": moreInfoRows[0].stateLicenseState,
        "MCSA-5875[0].Page4[0].fedDetermination[0].md[0]": md,
        "MCSA-5875[0].Page4[0].fedDetermination[0].do[0]": DO,
        "MCSA-5875[0].Page4[0].fedDetermination[0].physAssist[0]": pa,
        "MCSA-5875[0].Page4[0].fedDetermination[0].chiroPractor[0]": ch,
        "MCSA-5875[0].Page4[0].fedDetermination[0].pracNurse[0]": apn,
        "MCSA-5875[0].Page4[0].fedDetermination[0].otherPrac[0]": op,
        "MCSA-5875[0].Page4[0].fedDetermination[0].nationalRegister[0]": moreInfoRows[0].nationalLicense,
        "MCSA-5875[0].Page4[0].fedDetermination[0].expireDate[0]": moreInfoRows[0].exp,
        "MCSA-5875[0].Page4[0].fedDetermination[0].otherPracSpecify[0]": moreInfoRows[0].specify,
        "MCSA-5875[0].Page5[0].pageHead5[0].nameLastHead5[0]": rows[0].lastname,
        "MCSA-5875[0].Page5[0].pageHead5[0].nameFirstHead5[0]": rows[0].firstname,
        "MCSA-5875[0].Page5[0].pageHead5[0].nameInitialHead5[0]": rows[0].middlename,
        "MCSA-5875[0].Page5[0].pageHead5[0].dateBirth5[0]": rows[0].dob,
        "MCSA-5875[0].Page5[0].pageHead5[0].dateForm5[0]": date,
        "MCSA-5875[0].Page5[0].stateDetermination[0].standardButtonListState[0]": dqState,
        "MCSA-5875[0].Page5[0].stateDetermination[0].notStandardsWhyState[0]": reason,
        "MCSA-5875[0].Page5[0].stateDetermination[0].butStandardsWhyState[0]": "",
        "MCSA-5875[0].Page5[0].stateDetermination[0].qualifiedButtonListState[0]": cert,
        "MCSA-5875[0].Page5[0].stateDetermination[0].otherQualifyState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].varyRestrict[0].correctLensesState[0]": rows[0].glasses,
        "MCSA-5875[0].Page5[0].stateDetermination[0].varyRestrict[0].hearingAidState[0]": corrected,
        "MCSA-5875[0].Page5[0].stateDetermination[0].waiverQualifyState[0]": "x",
        "MCSA-5875[0].Page5[0].stateDetermination[0].waiverEnterState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].speQualifyState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].grandQualifyState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].examNameState[0]": moreInfoRows[0].fname + ' ' + moreInfoRows[0].lname,
        "MCSA-5875[0].Page5[0].stateDetermination[0].examDateState[0]": date,
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalAddressState[0]": moreInfoRows[0].registerAddress,
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalCityState[0]": moreInfoRows[0].registerCity,
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalStateState[0]": moreInfoRows[0].registerState,
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalZipState[0]": moreInfoRows[0].registerZip,
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalPhoneState[0]": moreInfoRows[0].registerPhone,
        "MCSA-5875[0].Page5[0].stateDetermination[0].certNumberState[0]": moreInfoRows[0].stateLicense,
        "MCSA-5875[0].Page5[0].stateDetermination[0].issueStateState[0]": moreInfoRows[0].stateLicenseState,
        "MCSA-5875[0].Page5[0].stateDetermination[0].mdState[0]": md,
        "MCSA-5875[0].Page5[0].stateDetermination[0].doState[0]": DO,
        "MCSA-5875[0].Page5[0].stateDetermination[0].physAssistState[0]": pa,
        "MCSA-5875[0].Page5[0].stateDetermination[0].chiroPractorState[0]": ch,
        "MCSA-5875[0].Page5[0].stateDetermination[0].pracNurseState[0]": apn,
        "MCSA-5875[0].Page5[0].stateDetermination[0].otherPracState[0]": op,
        "MCSA-5875[0].Page5[0].stateDetermination[0].otherSpec[0]": moreInfoRows[0].specify,
        "MCSA-5875[0].Page5[0].stateDetermination[0].nationalRegisterState[0]": moreInfoRows[0].nationalLicense,
        "MCSA-5875[0].Page5[0].stateDetermination[0].expireDateState[0]": moreInfoRows[0].exp
      };

      //0 state = does not meet
      //1 state = does not meet
      //2 state = meets but periodic
      //3 state = meets

      //0 fed = does not meet
      //1 fed = meets
      //2 fed = does not meet
      //3 fed = meetsbut periodic



      pdfFiller.fillForm(sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
        if (err) throw err;
        //console.log("In callback (we're done).");
      });


console.log("arr: " + arr)
            res.render('end', {
              title: 'End',
              user: user,
              data: timeline,
              count: historyCount
            });

            connection.release();
            })
          })
        })
      })
    })
  })
})
  }
}
//-------------------------------------------------------
var endPost = function(req, res, next) {


  var user = req.user;

  res.redirect('/pdf/' + sessionId)

};

module.exports.end = end;
module.exports.endPost = endPost;
