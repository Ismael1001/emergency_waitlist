function showSection(sectionId) {
    var sections = document.querySelectorAll('.container');
    sections.forEach(function (section) {
        section.style.display = 'none';
    });

    var showSection = document.getElementById(sectionId);
    showSection.style.display = 'block';

    var patientFormButton = document.querySelector('.topnav a[href="#patientForm"]');
    var waitlistButton = document.querySelector('.topnav a[href="#waitlist"]');
    
    if (sectionId === 'loginPage') {
        patientFormButton.style.display = 'none';
        waitlistButton.style.display = 'none';
    } else {
        patientFormButton.style.display = 'block';
        waitlistButton.style.display = 'block';
    }
}

function resetPatientFormInputs() {
    document.getElementById('patientName').value = '';
    document.getElementById('patientAge').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('gender').value = 'select';
    document.getElementById('condition').value = '';
    document.getElementById('severity').value = '3';
}

document.querySelector('.topnav a[href="#patientForm"]').addEventListener('click', function () {
    resetPatientFormInputs();
    showSection('patientForm');
});

function showSectionWaitlist(sectionName) {
    showSection(sectionName);
    fetchAndDisplayPatientRecords();
}

window.onload = function () {
    showSection('loginPage');
}

document.getElementById('signupButton').addEventListener('click', function () {
    showSection('signupPage');
});


document.getElementById('signupSubmit').addEventListener('click', function () {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Failed to create account');
            }
        })
        .then(text => {
            showSection('loginPage');
        })
        .catch(error => {
            alert(error.message);
        });
});

document.getElementById('login').addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username && password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return response.text().then(text => { throw new Error(text) });
                }
            })
            .then(text => {
                showSection('patientForm');
            })
            .catch(error => {
                alert(error.message);
            });
    } else {
        alert('Please enter both username and password');
    }
});

document.getElementById('formSubmit').addEventListener('click', function (e) {
    e.preventDefault();
    const patientData = {
        patientName: document.getElementById('patientName').value,
        patientAge: document.getElementById('patientAge').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        condition: document.getElementById('condition').value,
        severity: document.getElementById('severity').value
    };

    fetch('/submit-patient-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error submitting patient form');
            }
        })
        .then(text => {
            alert('Patient data inserted successfully');
            showSection('waitlist');
            fetchAndDisplayPatientRecords();
        })
        .catch(error => {
            alert(error.message);
        });
});

function fetchAndDisplayPatientRecords() {
    fetch('/get-patient-records')
        .then(response => response.json())
        .then(records => {
            const tableBody = document.querySelector('#waitlist tbody');
            tableBody.innerHTML = '';
            let serialNumber = 1;

            records.forEach(record => {
                const row = `<tr>
                    <td>${serialNumber++}</td>
                    <td>${record.name}</td>
                    <td>${record.gender}</td>
                    <td>${record.patientcondition}</td>
                    <td>${record.severity}</td>
                    <td>${record.waittime} mins</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error fetching patient records:', error);
        });
}




document.getElementById('backButton').addEventListener('click', function () {
    document.getElementById('patientName').value = '';
    document.getElementById('patientAge').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('gender').value = 'select';
    document.getElementById('condition').value = '';
    document.getElementById('severity').value = '';

    showSection('patientForm');
});

function startPollingForUpdates() {
    setInterval(fetchAndDisplayPatientRecords, 30000);
}

document.getElementById('waitlistButton').addEventListener('click', function () {
    fetchAndDisplayPatientRecords();
    startPollingForUpdates();
});