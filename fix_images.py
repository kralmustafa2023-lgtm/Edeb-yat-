import os

poets_dir = r"public\poets"
mapping = {
    "Cahit S\ufffdtk\ufffd Taranc\ufffd.jpg": "Cahit Sıtkı Tarancı.jpg",
    "Faruk Nafiz \ufffdaml\ufffdbel.jpg": "Faruk Nafiz Çamlıbel.jpg",
    "Karacao\ufffdlan.jpg": "Karacaoğlan.jpg",
    "Nam\ufffdk Kemal.jpg": "Namık Kemal.jpg",
    "Orhan Veli Kan\ufffdk.jpg": "Orhan Veli Kanık.jpg",
    "Yahya Kemal Beyatl\ufffd.webp": "Yahya Kemal Beyatlı.webp"
}

for old, new in mapping.items():
    old_path = os.path.join(poets_dir, old)
    new_path = os.path.join(poets_dir, new)
    if os.path.exists(old_path):
        os.rename(old_path, new_path)
        print(f"Renamed: {old} -> {new}")
    else:
        print(f"File not found: {old}")
