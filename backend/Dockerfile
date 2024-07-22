# Sử dụng image chính thức của Node.js làm base image
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép mã nguồn của ứng dụng vào thư mục làm việc
COPY src/ .

# Expose port mà ứng dụng của bạn sẽ lắng nghe
EXPOSE 3000

# Chạy ứng dụng khi container bắt đầu
CMD [ "node", "index.js" ]
