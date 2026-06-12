-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 10, 2026 at 08:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kmma_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `content` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `category`, `content`, `image_url`, `created_at`, `sort_order`) VALUES
(1, 'Promo Pembiayaan Spesial Hari Koperasi: Bunga Ringan Mulai 5%!', 'Promo', 'Menyambut Hari Koperasi Nasional, KMMA menghadirkan program Promo Pembiayaan Spesial dengan bunga super ringan mulai dari 5% per tahun untuk seluruh anggota aktif. Program ini dirancang khusus untuk membantu memenuhi kebutuhan pembiayaan modal usaha, renovasi rumah, pendidikan, maupun kebutuhan darurat lainnya.\n\nKeunggulan promo ini:\n- Bunga bersaing mulai 5% efektif per tahun\n- Proses persetujuan cepat (maksimal 3 hari kerja)\n- Jangka waktu pengembalian fleksibel hingga 5 tahun\n- Tanpa potongan biaya administrasi tersembunyi\n\nMasa berlaku promo ini terbatas mulai 1 Juni hingga 31 Juli 2026. Anggota dapat melihat detail informasi produk pada menu Pembiayaan dan menghubungi staf admin koperasi untuk panduan pemenuhan dokumen pendukung.', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80', '2026-06-05 08:06:31', 0),
(2, 'KMMA Donasi Qurban', 'Kegiatan', 'KMMA berqurban seekor kambing', 'http://localhost:5000/uploads/1780649289785.jpeg', '2026-06-05 08:06:31', 1),
(3, 'Pengumuman Seleksi Berkas Program Beasiswa KMMA Tahun Ajaran 2026/2027', 'Pengumuman', 'Panitia Seleksi Beasiswa KMMA secara resmi mengumumkan hasil seleksi tahap pertama (berkas administrasi) untuk program Beasiswa Pendidikan Prestasi tahun ajaran 2026/2027.\n\nDari ratusan berkas pendaftaran anak anggota koperasi yang masuk, panitia telah menyaring kandidat terbaik yang dinyatakan berhak melaju ke tahap berikutnya, yaitu wawancara tatap muka. \n\nDaftar nama kandidat yang lolos seleksi berkas dapat langsung diakses secara transparan melalui halaman menu Beasiswa di website resmi ini. Sesi wawancara dijadwalkan akan berlangsung pada tanggal 10-12 Juni 2026 bertempat di kantor pusat KMMA.\n\nBagi para peserta yang dinyatakan lolos berkas, diharapkan untuk mencetak kartu peserta dan membawa dokumen asli rapor/transkrip nilai serta surat rekomendasi saat menghadiri wawancara. Panitia mengucapkan selamat berjuang kepada seluruh kandidat!', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', '2026-06-05 08:06:31', 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `category` enum('produk','layanan') DEFAULT 'produk'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image_url`, `sort_order`, `category`) VALUES
(1, 'thgnfb', 'ukull7yj', NULL, 0, 'produk'),
(2, 'Pembiayaan Multiguna', 'Fasilitas pembiayaan serbaguna untuk berbagai kebutuhan konsumtif maupun produktif dengan persyaratan mudah dan suku bunga kompetitif.', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000', 1, 'layanan'),
(3, 'Pembiayaan Syariah', 'Pembiayaan bebas riba yang dikelola sesuai dengan prinsip syariat Islam. Solusi aman dan menenangkan untuk kebutuhan finansial Anda.', 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=1000', 2, 'layanan'),
(4, 'Pembiayaan Darurat', 'Dana cepat cair untuk mengatasi kebutuhan mendesak seperti biaya kesehatan atau insiden tak terduga. Proses persetujuan instan bagi anggota aktif.', 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1000', 3, 'layanan');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `name`, `title`, `subtitle`, `content`, `image_url`, `updated_at`) VALUES
(1, 'hero', 'KMMA ONE', 'Smart Cooperative Platform', 'Platform koperasi digital yang memudahkan anggota dalam mengakses layanan simpan pinjam, pembayaran, informasi, dan berbagai kebutuhan kapan saja, di mana saja.', 'http://localhost:5000/uploads/1778734633336.png', '2026-05-14 04:57:17'),
(2, 'about', 'Tentang Kami', 'Sinergi Untuk Sejahtera', 'KMMA adalah koperasi modern yang berfokus pada kesejahteraan anggota melalui teknologi digital.', NULL, '2026-05-13 07:34:53'),
(3, 'products', 'Produk Unggulan', 'Layanan Simpan Pinjam Terbaik', 'Kami menyediakan berbagai layanan keuangan yang mudah diakses.', NULL, '2026-05-13 07:34:53'),
(4, 'contact', 'Hubungi Kami', 'Siap Melayani Anda', 'Silakan hubungi kami melalui saluran berikut.', NULL, '2026-05-13 07:34:53'),
(5, 'tentang_sejarah', 'Sejarah Koperasi KMMA', 'Perjalanan Kami', 'Didirikan dengan semangat gotong royong, Koperasi KMMA hadir untuk menjadi mitra finansial terpercaya bagi seluruh anggota. Sejak awal berdirinya, kami terus berinovasi...', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000', '2026-05-22 01:47:37'),
(6, 'tentang_struktur', 'Struktur Organisasi', 'Tim Pengurus', 'Dipimpin oleh para profesional yang berdedikasi tinggi dan berpengalaman dalam industri keuangan dan pemberdayaan masyarakat.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000', '2026-05-22 01:47:37'),
(7, 'beasiswa_page', 'Program Beasiswa Pendidikan KMMA', 'Investasi Masa Depan', 'Sebagai bentuk kepedulian terhadap pendidikan, KMMA secara rutin menyalurkan beasiswa kepada putra-putri anggota yang berprestasi. Kami percaya bahwa pendidikan adalah kunci kesejahteraan.', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', '2026-05-22 01:47:37'),
(8, 'pembiayaan_page', 'Solusi Pembiayaan Cepat & Aman', 'Layanan Pembiayaan', 'Kami menyediakan berbagai jenis fasilitas pembiayaan dengan proses yang transparan, margin kompetitif, dan persyaratan yang mudah untuk mendukung kebutuhan finansial Anda.', 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=1000', '2026-05-22 01:47:37'),
(9, 'beasiswa_pengumuman', 'Pengumuman Penerima Beasiswa KMMA 2026', 'Selamat kepada para penerima terpilih!', 'Berikut adalah daftar nama mahasiswa dan pelajar yang dinyatakan lolos seleksi berkas dan wawancara program Beasiswa KMMA Tahun Ajaran 2026:\n\n1. Ahmad Fauzi (Universitas Indonesia)\n2. Syarifah Aulia (Institut Teknologi Bandung)\n3. Rian Hidayat (Universitas Gadjah Mada)\n4. Chelsea Olivia (Universitas Padjadjaran)\n5. Muhammad Rizky (Universitas Diponegoro)\n\nBagi para pemenang, mohon segera melakukan konfirmasi dan melengkapi dokumen penunjang melalui kontak yang tertera di menu Hubungi Kami.', NULL, '2026-06-01 12:58:15');

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `site_name` varchar(255) DEFAULT 'KMMA',
  `site_description` text DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `playstore_link` varchar(255) DEFAULT NULL,
  `appstore_link` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `contact_address` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `site_name`, `site_description`, `logo_url`, `playstore_link`, `appstore_link`, `contact_email`, `contact_phone`, `contact_address`, `updated_at`) VALUES
(1, 'KMMA', 'Sinergi Untuk Sejahtera', 'http://localhost:5000/uploads/1778815264918.png', '#', '#', NULL, NULL, NULL, '2026-05-15 03:25:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`) VALUES
(1, 'admin', 'admin123', 'Administrator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
