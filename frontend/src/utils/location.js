 
 export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'));
    }
    
    // Get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude, // Use 'lon' for consistency
        });
      },
      (err) => {
        // Handle common errors like user denying permission
        reject(new Error(`Location Error (${err.code}): ${err.message}`));
      }
    );
  });
};