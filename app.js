document.addEventListener('DOMContentLoaded', function() {
    const state = {
        participants: [],
        itemsFound: {},
        winner: null,
        completed: false,
        users: new Set()
    };

    // DOM references
    const inputLocation = document.getElementById('location');
    const selectType = document.getElementById('scavenger-type');
    const inputCount = document.getElementById('items-count');
    const startBtn = document.getElementById('start-hunt');
    const photoBtn = document.getElementById('take-photo-btn');
    const photoInput = document.getElementById('photo-input');
    const participantsDiv = document.getElementById('participant-list');
    const notificationsDiv = document.getElementById('notifications');
    const photoVerificationDiv = document.getElementById('photo-verification');
    
    // UI state
    const configInfo = document.getElementById('config-info');
    
    function showNotification(text, fromUser) {
        const notification = document.createElement('p');
        notification.textContent = `<strong>${fromUser}:</strong> ${text}`;
        notificationsDiv.appendChild(notification);
        notificationsDiv.scrollTop = notificationsDiv.scrollTop + 100;
    }

    function showResult(winner) {
        const result = document.getElementById('result');
        result.hidden = false;
        document.getElementById('winner').textContent = winner;
    }

    function updateConfig() {
        const location = inputLocation.value;
        if (location) {
            const type = selectType.value;
            const count = parseInt(inputCount.value);
            configInfo.textContent = `Scavenger Type: ${type}\nItems Needed: ${count}`;
        } else {
            configInfo.textContent = '';
        }
    }

    function showParticipant(name) {
        const div = document.createElement('div');
        div.textContent = name;
        participantsDiv.appendChild(div);
        participantsDiv.scrollTop = participantsDiv.scrollTop + 10;
    }

    // Event Listeners
    startBtn.addEventListener('click', function() {
        const location = inputLocation.value.trim();
        const type = selectType.value;
        const count = parseInt(inputCount.value, 10);
        
        if (!location) {
            alert('Please select a location first');
            return;
        }
        
        // Default user
        const user = {
            id: 'user_' + Math.random().toString(36).substring(7),
            name: 'You',
            location: location,
            type: type,
            count: count,
            itemsFound: []
        };
        
        state.users.add(user.id);
        inputLocation.value = '';
        updateConfig();
        
        // In a real app, this would send data to a server
        // For demo, we'll just show a success message
        showNotification(`Starting scavenger hunt at ${location} with ${count} items needed`, 'You');
        console.log('User started hunt:', user);
    });

    photoBtn.addEventListener('click', function() {
        const file = photoInput.files[0];
        if (!file) {
            alert('Please upload an image');
            return;
        }
        // In a real app, you'd validate the image file type here
        const fileName = file.name;
        // Here you would compare fileName against your expected items
        // For demo, we'll just note that photo was taken
        showNotification(`Photo taken: ${fileName}`, 'You');
        console.log('Photo taken:', fileName);
    });

    inputCount.addEventListener('change', updateConfig);
    selectType.addEventListener('change', updateConfig);
    inputLocation.addEventListener('change', updateConfig);
});
