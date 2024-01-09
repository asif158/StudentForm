var token = '90931844|-31949301175558043|90963008'
var dbName = 'SCHOOL-DB'
var relName = 'STUDENT-TABLE'
resetForm()
function validateAndGetFormData() {
  var rollnoVar = $('#rollno').val()

  if (rollnoVar === '') {
    alert('Roll No is Required!')
    $('#rollno').focus()
    return ''
  }

  var FullNameVar = $('#FullName').val()
  if (FullNameVar === '') {
    alert('Student Name is Required!')
    $('#FullName').focus()
    return ''
  }

  var classVar = $('#Class').val()
  if (classVar === '') {
    alert('Class is Required!')
    $('#Class').focus()
    return ''
  }

  var Address = $('#Address').val()
  if (Address === '') {
    alert('Address is Required!')
    $('#Address').focus()
    return ''
  }

  var BirthDate = $('#BirthDate').val()
  if (BirthDate === '') {
    alert('Birth Date is Required!')
    $('#BirthDate').focus()
    return ''
  }

  var EnrollmentDate = $('#EnrollmentDate').val()
  if (EnrollmentDate === '') {
    alert('Enrollment Date is Required!')
    $('#EnrollmentDate').focus()
    return ''
  }
  var jsonStrObj = {
    rollno: rollnoVar,
    FullName: FullNameVar,
    Class: classVar,
    Address: Address,
    BirthDate: BirthDate,
    EnrollmentDate: EnrollmentDate,
  }

  return JSON.stringify(jsonStrObj)
}

function UpdateStudent() {
  var jsonStr = validateAndGetFormData()
  if (jsonStr === '') {
    return
  }
  var putReqStr = createUPDATERecordRequest(
    token,
    jsonStr,
    dbName,
    relName,
    localStorage.getItem('rec_no')
  )
  jQuery.ajaxSetup({ async: false })
  var resultObj = executeCommandAtGivenBaseUrl(
    putReqStr,
    'http://api.login2explore.com:5577',
    '/api/iml'
  )
  if (resultObj.status === 200) {
    alert('Data updated Successfully')
  } else if (resultObj.status === 401) {
    alert('Invalid Token')
  } else if (resultObj.status === 400) {
    alert('Something went wrong, Try after some time')
  }
  jQuery.ajaxSetup({ async: true })
  resetForm()
}

function savetolocalstorage(resultObj) {
  var data = JSON.parse(resultObj.data)
  localStorage.setItem('rec_no', data.rec_no)
}

function resetForm() {
  $('#rollno').val('')
  $('#FullName').val('').prop('disabled', true)
  $('#Class').val('').prop('disabled', true)
  $('#Address').val('').prop('disabled', true)
  $('#BirthDate').val('').prop('disabled', true)
  $('#EnrollmentDate').val('').prop('disabled', true)
  $('#rollno').prop('disabled', false)
  $('#savebutton').prop('disabled', true)
  $('#update').prop('disabled', true)
  $('#reset').prop('disabled', true)
}

function enableInput() {
  $('#FullName').prop('disabled', false)
  $('#Class').prop('disabled', false)
  $('#Address').prop('disabled', false)
  $('#BirthDate').prop('disabled', false)
  $('#EnrollmentDate').prop('disabled', false)
  $('#reset').prop('disabled', false)
}

document
  .getElementById('rollno')
  .addEventListener('focusout', function (event) {
    var result = checkrecord()
  })

function checkrecord() {
  var rollnoVar = $('#rollno').val()
  if (rollnoVar === '') {
    alert('Student Roll no is Required!')
    $('#FullName').focus()
    return ''
  }

  var jsonObj = {
    rollno: rollnoVar,
  }
  var jsonStr = JSON.stringify(jsonObj)
  if (jsonStr === '') {
    return
  }
  var getReqStr = createGET_BY_KEYRequest(
    token,
    dbName,
    relName,
    jsonStr,
    true,
    true
  )
  jQuery.ajaxSetup({ async: false })
  var resultObj = executeCommandAtGivenBaseUrl(
    getReqStr,
    'http://api.login2explore.com:5577',
    '/api/irl'
  )
  if (resultObj.status !== 200) {
    $('#savebutton').prop('disabled', false)
    enableInput()
  } else {
    $('#savebutton').prop('disabled', true)
    fillData(resultObj)
    return true
  }
}

function fillData(resultObj) {
  var data = JSON.parse(resultObj.data)
  var data1 = JSON.stringify(data.record)
  var data2 = JSON.parse(data1)
  $('#rollno').val(data2.rollno)
  $('#FullName').val(data2.FullName)

  $('#Class').val(data2.Class)
  $('#Address').val(data2.Address)
  $('#BirthDate').val(data2.BirthDate)
  $('#EnrollmentDate').val(data2.EnrollmentDate)
  jQuery.ajaxSetup({ async: true })
  savetolocalstorage(resultObj)
  $('#rollno').prop('disabled', true)
  $('#savebutton').prop('disabled', true)
  $('#rollno').prop('disabled', true)
  $('#update').prop('disabled', false)

  enableInput()
}

function RegisterStudent() {
  var jsonStr = validateAndGetFormData()
  if (jsonStr === '') {
    return
  }
  var putReqStr = createPUTRequest(token, jsonStr, dbName, relName)
  jQuery.ajaxSetup({ async: false })
  var resultObj = executeCommandAtGivenBaseUrl(
    putReqStr,
    'http://api.login2explore.com:5577',
    '/api/iml'
  )
  if (resultObj.status === 200) {
    alert('Data added Successfully!')
  } else if (resultObj.status === 401) {
    alert('The Token is Invalid!')
  } else if (resultObj.status === 400) {
    alert('Something went wrong, Retry after some time!')
  }
  jQuery.ajaxSetup({ async: true })
  resetForm()
}
