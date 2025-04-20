import customAxios from "../configs/axios.config.js";

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Kategoriyalarni yuklash
  try {
    const response = await customAxios.get('/category/');
    const categorySelect = document.getElementById('productCategory');
    
    response.data.data.forEach(category => {
      const option = document.createElement('option');
      option.value = category._id;  // <-- ID ni value sifatida beramiz
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Kategoriyalarni yuklashda xato:', error);
    alert('Kategoriyalarni yuklab bolmadi');
  }

  // 2. Formani yuborish
  const productForm = document.getElementById('productForm');
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Form ma'lumotlarini yig'ish
    const formData = new FormData();
    formData.append('name', document.getElementById('productName').value);
    formData.append('category_id', document.getElementById('productCategory').value);
    formData.append('price', document.getElementById('productPrice').value);
    formData.append('description', document.getElementById('productDescription').value);
    formData.append('image', document.getElementById('productImage').files[0]);
    
    try {
      // Yuklashni boshlash
      const submitBtn = productForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Yuklanmoqda...';
      
      // APIga so'rov yuborish
      const response = await customAxios.post('/product/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Muvaffaqiyatli yuborilganda
      alert('Elon muvaffaqiyatli qoshildi!');
      window.location.href = '/'; // Bosh sahifaga qaytish
      
    } catch (error) {
      console.error('Elon qoshishda xato:', error);
      alert('Elon qoshishda xato yuz berdi: ' + (error.response?.data?.message || error.message));
    } finally {
      const submitBtn = productForm.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = 'E\'lon qo\'shish';
    }
  });
  
  // 3. Foydalanuvchi ma'lumotlari (agar kerak bo'lsa)
  // ...
});