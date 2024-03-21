function uploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.click();
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            
            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error uploading image.');
                }
                return response.blob();
            })
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);

                const existingImage = document.getElementById('uploadedImage');
                if (existingImage) {
                    existingImage.parentNode.removeChild(existingImage);
                }

                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.id = 'uploadedImage';
                imageElement.style.maxWidth = '300px';
                imageElement.style.maxHeight = '300px';
                
                const uploadButton = document.getElementById('uploadButton');
                uploadButton.parentNode.insertBefore(imageElement, uploadButton);
                
                alert('Image uploaded successfully!');
            })
            .catch(error => {
                alert(error.message || 'Network error.');
            });
        }
    };
}
