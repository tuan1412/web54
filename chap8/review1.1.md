# Flow
Input -> Process -> Output

Output: Error handling
Input: Validate Input

=> Đảm bảo được dữ liệu đầu vào đúng
=> Khả năng cao Output đúng

Backend tư duy: cần validate dữ liệu mặc dù Frontend đã validate rồi

Thay vì if else, ta sẽ sử dụng thư viện: Joi

# Practice
Mỗi module thêm validation.js => Khai báo schema cho mỗi một API => Schema khai báo như nào sẽ phụ thuộc vào doc

Viết middleware
- Function: đầu vào là schema, property của request
+ Mỗi một API là schema riêng
+ Mỗi một API thì có một cách truyền dữ liệu khác nhau 