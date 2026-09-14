import re
html = open("album_page.html", encoding="utf-8", errors="ignore").read()
print("岁华纪丽 出现次数:", html.count("岁华纪丽"))
print("article_list 出现次数:", html.count("article_list"))
print("album_name 出现次数:", html.count("album_name"))

# 提取所有 "岁华纪丽｜..." 片段（标题以全角竖线分隔）
titles = re.findall(r'岁华纪丽[｜|][^"<]{4,60}', html)
seen = list(dict.fromkeys(titles))
print("\n内嵌唯一标题数:", len(seen))
for i, t in enumerate(seen, 1):
    print(f"{i:2d}. {t}")

# 看看 article_list 周边结构
idx = html.find("article_list")
if idx != -1:
    print("\n--- article_list 周边 ---")
    print(html[idx:idx+400].replace("\n", " "))
