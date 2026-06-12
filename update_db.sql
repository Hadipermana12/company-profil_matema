UPDATE `news` SET `title` = REPLACE(`title`, 'Pinjaman', 'Pembiayaan'), `content` = REPLACE(`content`, 'Pinjaman', 'Pembiayaan');
UPDATE `news` SET `title` = REPLACE(`title`, 'pinjaman', 'pembiayaan'), `content` = REPLACE(`content`, 'pinjaman', 'pembiayaan');

UPDATE `products` SET `name` = REPLACE(`name`, 'Pinjaman', 'Pembiayaan'), `description` = REPLACE(`description`, 'Pinjaman', 'Pembiayaan');
UPDATE `products` SET `name` = REPLACE(`name`, 'pinjaman', 'pembiayaan'), `description` = REPLACE(`description`, 'pinjaman', 'pembiayaan');

UPDATE `sections` SET `id` = REPLACE(`id`, 'pinjaman', 'pembiayaan'), `title` = REPLACE(`title`, 'Pinjaman', 'Pembiayaan'), `subtitle` = REPLACE(`subtitle`, 'Pinjaman', 'Pembiayaan'), `content` = REPLACE(`content`, 'Pinjaman', 'Pembiayaan');
UPDATE `sections` SET `title` = REPLACE(`title`, 'pinjaman', 'pembiayaan'), `subtitle` = REPLACE(`subtitle`, 'pinjaman', 'pembiayaan'), `content` = REPLACE(`content`, 'pinjaman', 'pembiayaan');
