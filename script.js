// Simulate user data and video storage using localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let videos = JSON.parse(localStorage.getItem('videos')) || [];

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        if (username === "kingyork" && password === "1116") {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'main.html';
        }
    } else {
        alert('Invalid login. Please sign up first.');
    }
});

document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    const existingUser = users.find(user => user.username === newUsername);
    
    if (existingUser) {
        alert('Username already exists. Try a different one.');
    } else {
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Signup successful! Please log in.');
        window.location.href = 'index.html';
    }
});

document.getElementById('uploadForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const videoTitle = document.getElementById('videoTitle').value;
    const videoUrl = document.getElementById('videoUrl').value;
    
    videos.push({ title: videoTitle, url: videoUrl, date: new Date().toISOString() });
    localStorage.setItem('videos', JSON.stringify(videos));

    alert('Video uploaded successfully!');
    window.location.href = 'main.html';
});

function loadVideos() {
    const videoList = document.getElementById('videoList');
    if (videos.length > 0) {
        videos.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
        videos.forEach(video => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${video.url}" target="_blank">${video.title}</a> (Uploaded on: ${new Date(video.date).toLocaleDateString()})`;
            videoList.appendChild(li);
        });
    } else {
        videoList.innerHTML = '<p>No videos available</p>';
    }
}

// Call loadVideos on the main.html page
if (window.location.pathname.includes('main.html')) {
    loadVideos();
}

function toggleSignup() {
    document.getElementById('signupHeader').style.display = 'block';
    document.getElementById('signupForm').style.display = 'block';
}
