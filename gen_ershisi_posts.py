import json, os

items = json.load(open("album_items.json", encoding="utf-8"))
# slug 按合集顺序（白露→谷雨，时间倒序）固定映射，避免重名
slugs = ["bailu","chushu","liqiu","dashu","xiaoshu","xiazhi","mangzhong","xiaoman","lixia","guyu"]
out_dir = "src/content/posts"
os.makedirs(out_dir, exist_ok=True)

for it, slug in zip(items, slugs):
    title = it["title"]
    jq = title.split("｜")[1].split("：")[0] if "｜" in title else ""
    date = it["date"]
    url = it["url"]
    desc = f"《岁华纪丽》二十四节气生活馆 · {jq}篇。正文整理中，下一步从公众号原文迁移。"
    body = f"""---
title: {title}
date: {date}
series: ershisijieqi
description: {desc}
tags: [二十四节气, {jq}, 节气生活]
---

> 本文为「纪丽二十四节气生活馆」系列占位卡片，正文下一步从公众号原文迁移整理。
> 原文链接：[{title}]({url})

（待迁移：下一步将抓取公众号原文正文与配图，填充至此。）
"""
    p = os.path.join(out_dir, f"{slug}.md")
    with open(p, "w", encoding="utf-8") as f:
        f.write(body)
    print("生成", slug, "->", title)
print("共生成", len(items), "篇占位文章")
