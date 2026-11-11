# Mellow Candle: cấu trúc file để cập nhật trên GitHub

| File | Dùng để | Khi nào sửa |
|---|---|---|
| `index.html` | Khung trang, nạp font và các file bên dưới | Hầu như không cần sửa |
| `theme.css` | **Màu sắc và font chữ** của từng mục | Muốn đổi giao diện |
| `style.css` | Bố cục cơ bản của trang | Muốn chỉnh bố cục |
| `config.js` | **Khóa Supabase, giá bán, phí quà tặng** | Đổi giá, kết nối Supabase |
| `app.js` | Toàn bộ chức năng: sản phẩm, giỏ hàng, Mood Label, nhạc, tạo thông điệp QR | Chỉnh nội dung, câu hỏi trắc nghiệm |
| `assets/` | Ảnh hộp nến, logo, thẻ Mood Label | Thay ảnh (giữ nguyên tên file) |
| `schema.sql` | Tạo bảng trong Supabase (chạy một lần) | Không cần sửa |

Giữ nguyên cấu trúc thư mục khi tải lên GitHub (thư mục `assets` nằm cạnh `index.html`).
Muốn cập nhật một phần, chỉ cần tải lại đúng file đó lên GitHub rồi đợi GitHub Pages cập nhật vài phút
(nếu chưa thấy thay đổi, bấm Ctrl+F5 để tải lại trang).
