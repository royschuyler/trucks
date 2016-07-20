var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var route = require('./route');
var Model = require('./model');


passport.use(new LocalStrategy(function(username, password, done) {
   new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});
//--------------------------------------------------------------
var fs = require('fs');


//----------------------------------------------------------------
var pdfFiller   = require('pdffiller');

var sourcePDF = "newFormSpecial.pdf";
// var destinationPDF =  "../../Desktop/watch8.pdf";
var destinationPDF =  "watch9.pdf";
var shouldFlatten = true;
var data = {
"MCSA-5875[0].Page1[0].privacyStatement[0].privacyDate[0]": "tester",
"MCSA-5875[0].Page1[0].medRecord[0].medNumber[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].nameLast[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].nameFirst[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].nameInitial[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].birthDate[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].driverAge[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].driverAddress[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].driverCity[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].driverState[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].driverZip[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].driverLicense[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].licenseState[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].driverPhone[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].genderGroup[0].genderButtons[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].emailAddress[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].cdlLicense[0].cdlButtonList[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].driverVerify[0]": "tester",
"MCSA-5875[0].Page1[0].driverPersonal[0].certDenyGroup[0].certDenyButtons[0]": "tester",
"MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryButtons[0]": "tester",
"MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryDescribe[0]": "tester",
"MCSA-5875[0].Page1[0].medicineGroup[0].medicineButtons[0]": "tester",
"MCSA-5875[0].Page1[0].medicineGroup[0].medicineDescribe[0]": "tester",
"MCSA-5875[0].Page1[0].attachButton[0]": "tester",
"MCSA-5875[0].Page2[0].pageHead2[0].nameLastHead2[0]": "tester",
"MCSA-5875[0].Page2[0].pageHead2[0].nameFirstHead2[0]": "tester",
"MCSA-5875[0].Page2[0].pageHead2[0].nameInitialHead2[0]": "tester",
"MCSA-5875[0].Page2[0].pageHead2[0].dateBirth2[0]": "tester",
"MCSA-5875[0].Page2[0].pageHead2[0].dateForm2[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].headGroup[0].headButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].seizeGroup[0].seizeButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].eyeGroup[0].eyeButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].earGroup[0].earButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].heartGroup[0].heartButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].paceGroup[0].paceButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].highGroup[0].highButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].cholesterolGroup[0].cholesterolButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].breathGroup[0].breathButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].lungGroup[0].lungButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].kidneyGroup[0].kidneyButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].stomachGroup[0].stomachButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].sugarGroup[0].sugarButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].insulinGroup[0].insulinButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].mentalGroup[0].mentalButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].faintGroup[0].faintButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].dizzyGroup[0].dizzyButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].weightGroup[0].weightButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].strokeGroup[0].strokeButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].uselimitGroup[0].uselimitButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].neckbackGroup[0].neckbackButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].boneGroup[0].boneButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].bloodGroup[0].bloodButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].cancerGroup[0].cancerButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].infectGroup[0].infectButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].apneaGroup[0].apneaButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].sleeptestGroup[0].sleeptestButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].hospitalGroup[0].hospitalButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].brokenGroup[0].brokenButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].tobaccoGroup[0].tobaccoButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].alcoholGroup[0].alcoholButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].illegalGroup[0].illegalButtons[0]": "tester",
"MCSA-5875[0].Page2[0].driverHealth[0].failedGroup[0].failedButtons[0]": "tester",
"MCSA-5875[0].Page2[0].otherGroup[0].otherButtons[0]": "tester",
"MCSA-5875[0].Page2[0].otherGroup[0].otherDescribe[0]": "tester",
"MCSA-5875[0].Page2[0].commentGroup[0].commentButtons[0]": "tester",
"MCSA-5875[0].Page2[0].commentGroup[0].commentDescribe[0]": "tester",
"MCSA-5875[0].Page2[0].attachButton[0]": "tester",
"MCSA-5875[0].Page2[0].driverSignature[0].signatureDate[0]": "tester",
"MCSA-5875[0].Page2[0].#area[2].driveReview[0].examinerComment[0]": "tester",
"MCSA-5875[0].Page2[0].#area[2].driveReview[0].attachButton2[0]": "tester",
"MCSA-5875[0].Page3[0].pageHead3[0].nameLastHead3[0]": "tester",
"MCSA-5875[0].Page3[0].pageHead3[0].nameFirstHead3[0]": "tester",
"MCSA-5875[0].Page3[0].pageHead3[0].nameInitialHead3[0]": "tester",
"MCSA-5875[0].Page3[0].pageHead3[0].dateBirth3[0]": "tester",
"MCSA-5875[0].Page3[0].pageHead3[0].dateForm3[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].pulseMeasure[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].pulserhythmGroup[0].pulserhythmButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].#area[1].feetHeight[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].#area[1].inchesHeight[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].#area[1].poundsWeight[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row1[0].sitSys[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row1[0].sitDias[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row2[0].secSys[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row2[0].secDias[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].otherTesting[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].spgrNumber[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].proteinNumber[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].bloodNumber[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].sugarNumber[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].uncorrectRight[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].correctRight[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].fieldRight[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].uncorrectLeft[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].correctLeft[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].fieldLeft[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].uncorrectBoth[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].correctBoth[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].distinguishGroup[0].distinguishButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].monocularGroup[0].monocularButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].referredGroup[0].referredButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].documentGroup[0].documentButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].hearingaidGroup[0].hearingaidButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].whisperRight[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].whisperLeft[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].right500[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].right1000[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].right2000[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].left500[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].left1000[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].left2000[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].rightAverage[0]": "tester",
"MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].leftAverage[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].generalButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].skinButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].eyesButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].earsButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].mouthButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].heartButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].chestButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].abdomenButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].herniaButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].backButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].jointsButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].neuroButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].gaitButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].vascularButtons[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].examComment[0]": "tester",
"MCSA-5875[0].Page3[0].driveExam[0].attachButton3[0]": "tester",
"MCSA-5875[0].Page4[0].pageHead4[0].nameLastHead4[0]": "tester",
"MCSA-5875[0].Page4[0].pageHead4[0].nameFirstHead4[0]": "tester",
"MCSA-5875[0].Page4[0].pageHead4[0].nameInitialHead4[0]": "tester",
"MCSA-5875[0].Page4[0].pageHead4[0].dateBirth4[0]": "tester",
"MCSA-5875[0].Page4[0].pageHead4[0].dateForm4[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].standardButtonList[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].notStandardsWhy[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].butStandardsWhy[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].qualifiedButtonList[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].otherQualify[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].correctLenses[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].hearingAid[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].waiverQualify[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].waiverEnter[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].speQualify[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].cfrQualify[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].exemptQualify[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].incompleteButtonList[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].pendingWhy[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].returnExam[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].returnDate[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].reportAmend[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].amendWhy[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].ifAmendDate[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].incompleteWhy[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].examName[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].medicalAddress[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].medicalCity[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].medicalState[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].medicalZip[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].medicalPhone[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].examDate[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].certNumber[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].issueState[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].md[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].do[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].physAssist[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].chiroPractor[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].pracNurse[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].otherPrac[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].nationalRegister[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].expireDate[0]": "tester",
"MCSA-5875[0].Page4[0].fedDetermination[0].otherPracSpecify[0]": "tester",
"MCSA-5875[0].Page5[0].pageHead5[0].nameLastHead5[0]": "tester",
"MCSA-5875[0].Page5[0].pageHead5[0].nameFirstHead5[0]": "tester",
"MCSA-5875[0].Page5[0].pageHead5[0].nameInitialHead5[0]": "tester",
"MCSA-5875[0].Page5[0].pageHead5[0].dateBirth5[0]": "tester",
"MCSA-5875[0].Page5[0].pageHead5[0].dateForm5[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].standardButtonListState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].notStandardsWhyState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].butStandardsWhyState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].qualifiedButtonListState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].otherQualifyState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].correctLensesState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].hearingAidState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].waiverQualifyState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].waiverEnterState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].speQualifyState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].grandQualifyState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].examNameState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].examDateState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].medicalAddressState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].medicalCityState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].medicalStateState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].medicalZipState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].medicalPhoneState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].certNumberState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].issueStateState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].mdState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].doState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].physAssistState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].chiroPractorState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].pracNurseState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].otherPracState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].otherSpec[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].nationalRegisterState[0]": "tester",
"MCSA-5875[0].Page5[0].stateDetermination[0].expireDateState[0]": "tester"

};

pdfFiller.fillForm( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
});


//----------------------------------------------------------------

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('www'));

app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', route.index);
app.get('/signin', route.signIn);
app.get('/signup', route.signUp);
app.get('/home', route.home);
app.get('/end', route.end);
app.get('/pdf', route.pdf);
app.get('/demographics', route.demographics);
app.get('/history', route.history);
app.get('/historyreview', route.historyReview);
app.get('/testing', route.testing);
app.get('/vision', route.vision);
app.get('/hearing', route.hearing);
app.get('/medication', route.medication);
app.get('/signout', route.signOut);
app.get('/dropdown', route.dropdown);
app.get('/warn', route.warn);
app.get('/form', route.form);
app.get('/physicalexamination', route.physicalExamination)



app.post('/signin', route.signInPost);
app.post('/signup', route.signUpPost);
app.post('/end', route.endPost);
app.post('/demographics', route.demographicsPost);
app.post('/history', route.historyPost);
app.post('/historyreview', route.historyReviewPost);
app.post('/testing', route.testingPost);
app.post('/vision', route.visionPost);
app.post('/hearing', route.hearingPost);
app.post('/dropdown', route.dropdownPost);
app.post('/physicalexamination', route.physicalExaminationPost)




app.use(route.notFound404);






var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});


