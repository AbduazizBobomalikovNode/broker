// Ruxsat olish uchun so'rov yuborish
Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      // Ruxsat berildi
      var notification = new Notification('Yangi veb-sayt', {
        body: 'Sizning yangi veb-saytingizga xush kelibsiz!',
      });
    } else if (permission === 'denied') {
      // Ruxsat berilmadi
      console.log('Ruxsat berilmadi');
    }
  });
  