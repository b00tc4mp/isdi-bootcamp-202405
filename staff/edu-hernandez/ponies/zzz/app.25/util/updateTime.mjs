function updateTime(date) {
  const time = new Date();
  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  document.getElementById('current-time').textContent = `${hours}:${minutes}`
}

// Update Time every minute
setInterval(updateTime, 60000);

export default updateTime