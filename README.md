# talalwasim.github.io

Personal academic homepage, built with [Jekyll](https://jekyllrb.com) and served by GitHub Pages. No plugins, no build step on your machine: push to `main` and GitHub builds it.

## Where things live

| You want to…                        | Edit                          |
| ----------------------------------- | ----------------------------- |
| Change name, position, email, links | `_config.yml`                 |
| Edit the About / Research text      | `index.md`                    |
| Add a news item                     | `_data/news.yml`              |
| Add a paper or a category divider   | `_data/publications.yml`      |
| Edit reviewing / supervision lists  | `_data/services.yml`          |
| Change colours or teaser size       | `_sass/_tokens.scss`          |

Everything else (`_layouts`, `_includes`, `_sass`, `assets/js`) is the machinery and should not need touching for content updates.

## Adding a paper

Append an entry to `_data/publications.yml`. Every field except `title` is optional; whatever you leave out simply doesn't render.

```yaml
- title: "Paper title"
  authors: "First Author, Syed Talal Wasim, Third Author"   # your name is bolded automatically
  venue: "CVPR, 2027"
  badge: CVPR                    # small tag under the teaser image
  award: Oral                    # optional, shown next to the venue
  image: assets/paper_imgs/x.png # any aspect ratio; it is never cropped
  links:                         # any label -> URL, buttons appear in this order
    Paper: https://arxiv.org/abs/...
    Code: https://github.com/...
    Project page: https://...
  bibtex: |                      # button only appears when this is present
    @inproceedings{key,
      title={...},
      author={...},
      booktitle={CVPR},
      year={2027}
    }
```

Quote `title`/`authors`/`venue` in double quotes if they contain a colon.

### Category dividers

A divider is an entry with just a `category` key. Put it wherever you want the line to appear; use as many as you like, with any label:

```yaml
- category: "2027"
- title: ...
- title: ...
- category: "Preprints"
- title: ...
```

## Adding a news item

Newest first in `_data/news.yml`. Write the text on the line after `text: >-` so quotes and colons never need escaping. Markdown links work.

```yaml
- date: Sep 2026
  text: >-
    Our paper "Something: With a Colon" is accepted in [NeurIPS 2026](https://neurips.cc).
```

The first `news_visible` items (set in `_config.yml`) are shown; the rest sit behind a "Show all" button.

## Sidebar links

In `_config.yml`, `links` is a list of `label`, `url`, `icon`. Available icons: `scholar`, `cv`, `github`, `linkedin`, `x`, `orcid`, `mail`, `globe`. To add a new brand icon, drop its SVG path into `_includes/icon.html`.

## Dark / light mode

The page follows the visitor's system preference until they press the toggle; their choice is then remembered in the browser. All colours are CSS variables at the top of `_sass/_tokens.scss` (one block for light, one for dark).

## Teaser image size

Two variables in `_sass/_tokens.scss`:

```scss
--pub-figure-width: 220px;       // width of the image column on desktop
--pub-figure-max-height: 150px;  // tallest an image may be
```

Images keep their aspect ratio and are never cropped. On phones they span the full width.

## Running locally (optional)

Requires Ruby. The `github-pages` gem reproduces GitHub's build environment exactly.

```bash
bundle install
bundle exec jekyll serve --livereload
# open http://localhost:4000
```

## Credits

Fonts: [Newsreader](https://github.com/productiontype/Newsreader) and [IBM Plex Sans](https://github.com/IBM/plex), both SIL OFL, self-hosted in `assets/fonts/`.
Icons: brand icons from [Font Awesome Free](https://fontawesome.com) (CC BY 4.0), interface icons from [Lucide](https://lucide.dev) (ISC). Licences in `assets/icons/`.
