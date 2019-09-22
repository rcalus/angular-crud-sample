const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.get('/api/members/:id', (req, res) => {
  request('http://localhost:3000/members/' + req.params.id, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Submit Form!
app.post('/api/members', (req, res) => {
  console.log('Server: create member...');
  var errors = validateMemberForm('create', req.body);
  if (errors.length > 0) {
    res.status(400);
    res.send(req.body);
  }
  request.post('http://localhost:3000/members', {
    json: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      jobTitle: req.body.jobTitle,
      team: req.body.team,
      status: req.body.status
    }
  }, (error, response, body) => {
    if (error) {
      console.error(error)
      return
    }
    res.send(body);
  });
});

app.put('/api/members', (req, res) => {
  console.log('Server: updating member...' + req.body.id);
  var errors = validateMemberForm('update', req.body);
  if (errors.length > 0) {
    res.status(400);
    res.send(req.body);
  }

  request.put('http://localhost:3000/members/' + req.body.id, {
    json: {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      jobTitle: req.body.jobTitle,
      team: req.body.team,
      status: req.body.status
    }
  }, (error, response, body) => {
    if (error) {
      console.error(error)
      return
    }
    res.send(body);
  });
});

app.delete('/api/members/:id', (req, res) => {
  request.delete('http://localhost:3000/members/' + req.params.id
    , (error, response, body) => {
      if (error) {
        console.error(error)
        return
      }
      res.send(body);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});

function validateMemberForm(action, memberForm) {
  var errors = [];
  if (action === 'update') {
    if (!memberForm.id)
      errors.push('Missing required field: id')
  }
  if (!memberForm.firstName)
    errors.push('Missing required field: firstName');

  if (!memberForm.lastName)
    errors.push('Missing required field: lastName');
  if (!memberForm.jobTitle)
    errors.push('Missing required field: jobTitle');
  if (!memberForm.team)
    errors.push('Missing required field: team');
  if (!memberForm.status)
    errors.push('Missing required field: status');

  return errors;
}
