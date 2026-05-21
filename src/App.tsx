import { useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { questions } from './data/questions';
import { personas } from './data/personas';
import { addPersonaScores, addWeights, calculateResult, createEmptyPersonaScores, createEmptyScores } from './logic/scoring';
import { getFirstUnansweredIndex, hasCompleteAnswers } from './logic/quizFlow';
import type { PersonaMatch, QuizResult } from './types';

type Screen = 'home' | 'quiz' | 'result' | 'gallery';

type PersonaStyle = CSSProperties & {
  '--accent': string;
  '--accent-border': string;
  '--accent-soft': string;
  '--accent-faint': string;
  '--accent-deep': string;
  '--accent-contrast': string;
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [galleryPersonaId, setGalleryPersonaId] = useState<string | null>(null);
  const advancingRef = useRef(false);

  const result = useMemo<QuizResult | null>(() => {
    if (!hasCompleteAnswers(questions, answers)) {
      return null;
    }

    let scores = createEmptyScores();
    let personaScores = createEmptyPersonaScores();
    for (const question of questions) {
      const selected = question.options.find((option) => option.id === answers[question.id]);
      if (selected) {
        scores = addWeights(scores, selected.weights);
        personaScores = addPersonaScores(personaScores, selected.personaScores);
      }
    }

      return applyEasterEggTrigger(calculateResult(scores, personas, personaScores), answers, personas);
    }, [answers]);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  function startQuiz() {
    setScreen('quiz');
    setCurrentIndex(0);
  }

  function selectOption(optionId: string) {
    if (advancingRef.current) {
      return;
    }

    advancingRef.current = true;
    setIsAdvancing(true);

    const nextAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(nextAnswers);

    window.setTimeout(() => {
      if (currentIndex === questions.length - 1) {
        const firstUnansweredIndex = getFirstUnansweredIndex(questions, nextAnswers);
        if (firstUnansweredIndex === -1) {
          setScreen('result');
        } else {
          setCurrentIndex(firstUnansweredIndex);
          setScreen('quiz');
        }
      } else {
        setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
      }

      advancingRef.current = false;
      setIsAdvancing(false);
    }, 140);
  }

  function previousQuestion() {
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  function resetQuiz() {
    setAnswers({});
    setCurrentIndex(0);
    setIsAdvancing(false);
    setGalleryPersonaId(null);
    advancingRef.current = false;
    setScreen('home');
  }

  function openGallery() {
    setGalleryPersonaId(null);
    setScreen('gallery');
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function openGalleryPersona(personaId: string) {
    setGalleryPersonaId(personaId);
    setScreen('gallery');
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return (
    <main className="app-shell">
      <div className="stage-glow" />
      {screen === 'home' && <HomeScreen onStart={startQuiz} />}

      {screen === 'quiz' && (
        <section className="quiz-layout" aria-live="polite">
          <article className="question-card">
            <header className="topbar">
              <button className="ghost-button" onClick={() => setScreen('home')} type="button">
                退出
              </button>
              <span className="seat-label">Seat {String(currentQuestion.id).padStart(2, '0')}</span>
            </header>

            <div className="progress-block">
              <div className="progress-copy">
                <span>{currentIndex + 1} / {questions.length}</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            <p className="kicker">生活小事故采样中</p>
            <h1>{currentQuestion.prompt}</h1>
            {currentQuestion.sourceNote && (
              <p className="question-note">
                <span>来自注释</span>
                {currentQuestion.sourceNote}
              </p>
            )}
            <div className="option-stack">
              {currentQuestion.options.map((option) => {
                const selected = answers[currentQuestion.id] === option.id;
                return (
                  <button
                    className={selected ? 'option-button selected' : 'option-button'}
                    disabled={isAdvancing}
                    key={option.id}
                    onClick={() => selectOption(option.id)}
                    type="button"
                  >
                    <span>{option.id.toUpperCase()}</span>
                    <strong>{option.text}</strong>
                  </button>
                );
              })}
            </div>

            <footer className="quiz-footer">
              <button className="secondary-button" disabled={currentIndex === 0} onClick={previousQuestion} type="button">
                上一题
              </button>
              <p>别想太久，第一反应通常最会出卖人。</p>
            </footer>
          </article>
        </section>
      )}

      {screen === 'result' && result && <ResultScreen onExplore={openGallery} onReset={resetQuiz} result={result} />}
      {screen === 'result' && !result && (
        <IncompleteScreen
          onResume={() => {
            const firstUnansweredIndex = getFirstUnansweredIndex(questions, answers);
            setCurrentIndex(firstUnansweredIndex === -1 ? 0 : firstUnansweredIndex);
            setScreen('quiz');
          }}
          onReset={resetQuiz}
        />
      )}

      {screen === 'gallery' && result && galleryPersonaId && (
        <ResultScreen
          initialPersonaId={galleryPersonaId}
          key={`gallery-${galleryPersonaId}`}
          onBackToGallery={openGallery}
          onBackToMyResult={() => setScreen('result')}
          onExplore={openGallery}
          onReset={resetQuiz}
          result={result}
        />
      )}

      {screen === 'gallery' && (!result || !galleryPersonaId) && (
        <PersonaGalleryScreen
          onBack={() => setScreen(result ? 'result' : 'home')}
          onOpenPersona={openGalleryPersona}
          onReset={resetQuiz}
        />
      )}
    </main>
  );
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="home-screen">
      <div className="home-marquee" aria-hidden="true">
        <span>♪</span>
        <span>★</span>
        <span>♫</span>
      </div>
      <div className="ticket-mark">MCTI</div>
      <div className="home-copy">
        <p className="kicker">Musical Character Type Indicator</p>
        <h1>测测你的音乐剧角色人格</h1>
        <p>
          19 道当代生活情景题，不考剧目知识，看看你的日常反应更像哪位经典音乐剧角色。
        </p>
      </div>
      <div className="home-stage-card" aria-hidden="true">
        <span>PLAYBILL</span>
        <strong>19 scenes</strong>
        <em>角色匹配中</em>
      </div>
      <button className="primary-button" onClick={onStart} type="button">
        开始测试
      </button>
      <p className="notice">本测试仅供娱乐和音乐剧入坑使用，不代表真实心理诊断。</p>
    </section>
  );
}

function applyEasterEggTrigger(
  result: QuizResult,
  answers: Record<number, string>,
  allPersonas: typeof personas
): QuizResult {
  const triggeredPersonaId = getTriggeredEasterEggId(answers);

  if (!triggeredPersonaId || result.primary.persona.id === triggeredPersonaId) {
    return result;
  }

  const triggeredPersona = allPersonas.find((persona) => persona.id === triggeredPersonaId);
  if (!triggeredPersona) {
    return result;
  }

  const secondary = result.primary.persona.id === triggeredPersona.id
    ? result.secondary
    : result.primary;

  return {
    ...result,
    primary: {
      persona: triggeredPersona,
      similarity: 1,
      percentage: 99
    },
    secondary
  };
}

function getTriggeredEasterEggId(answers: Record<number, string>) {
  if (answers[4] === 'a' && answers[5] === 'a' && answers[16] === 'd') {
    return 'plant';
  }

  if (answers[15] === 'a' && answers[17] === 'd' && answers[19] === 'b') {
    return 'curtain';
  }

  return null;
}

function getResultMatchForPersona(result: QuizResult, personaId: string): PersonaMatch {
  if (result.primary.persona.id === personaId) {
    return result.primary;
  }

  if (result.secondary.persona.id === personaId) {
    return result.secondary;
  }

  const persona = personas.find((item) => item.id === personaId);
  return persona
    ? { persona, similarity: 0, percentage: Math.min(result.primary.percentage, 82) }
    : result.primary;
}

function getCompanionMatchForPersona(result: QuizResult, personaId: string): PersonaMatch {
  return result.primary.persona.id === personaId ? result.secondary : result.primary;
}

function ResultScreen({
  initialPersonaId,
  onBackToGallery,
  onBackToMyResult,
  onExplore,
  onReset,
  result
}: {
  initialPersonaId?: string;
  onBackToGallery?: () => void;
  onBackToMyResult?: () => void;
  onExplore: () => void;
  onReset: () => void;
  result: QuizResult;
}) {
  const [displayedPersonaId, setDisplayedPersonaId] = useState(initialPersonaId ?? result.primary.persona.id);
  const displayedPrimary = getResultMatchForPersona(result, displayedPersonaId);
  const displayedSecondary = getCompanionMatchForPersona(result, displayedPrimary.persona.id);
  const displayedResult: QuizResult = {
    ...result,
    primary: displayedPrimary,
    secondary: displayedSecondary
  };
  const persona = displayedPrimary.persona;
  const secondary = displayedSecondary.persona;
  const personaStyle = createPersonaStyle(persona.accent);
  const hasSupplementImages = persona.source !== '剧场彩蛋' || Boolean(persona.posterPath && persona.stillPath);
  const [isSaving, setIsSaving] = useState(false);
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
  const posterTitle = persona.posterTitle ?? persona.source;
  const posterTitleCn = persona.posterTitleCn ?? getSourceCn(posterTitle);
  const stillTitle = persona.stillTitle ?? persona.englishName;
  const stillTitleCn = persona.stillTitleCn ?? getCharacterCn(persona.name);
  const showsRareEasterEggBanner = persona.id === 'curtain';
  const isViewingCompanionPersona = displayedPrimary.persona.id !== result.primary.persona.id;
  const showsGalleryReturnControls = Boolean(onBackToGallery && onBackToMyResult);
  const isGalleryDetailView = showsGalleryReturnControls;
  const showsMatchBadge = displayedPrimary.persona.id === result.primary.persona.id && !isGalleryDetailView;

  async function saveResultImage() {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      await document.fonts?.ready;
      const blob = await createSharePosterBlob(displayedResult, secondary);

      const filename = `${persona.englishName.replace(/\s+/g, '-')}-MCTI.png`;
      const file = new File([blob], filename, { type: 'image/png' });
      const shareNavigator = navigator as Navigator & {
        canShare?: (data: ShareData) => boolean;
        share?: (data: ShareData) => Promise<void>;
      };

      if (shareNavigator.share && shareNavigator.canShare?.({ files: [file] })) {
        await shareNavigator.share({
          files: [file],
          title: '我的音乐剧人格结果',
          text: `${persona.title}——${persona.englishName}`
        });
      } else {
        const imageUrl = URL.createObjectURL(blob);
        setSavedImageUrl((currentUrl) => {
          if (currentUrl) {
            URL.revokeObjectURL(currentUrl);
          }
          return imageUrl;
        });
      }
    } catch (error) {
      console.error(error);
      window.alert('图片生成失败了，可以刷新后再试一次。');
    } finally {
      setIsSaving(false);
    }
  }

  function closePreview() {
    setSavedImageUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return null;
    });
  }

  function openPersonaResult(personaId: string) {
    setDisplayedPersonaId(personaId);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return (
    <section className="result-layout" style={personaStyle}>
      <article className="result-poster" data-persona={persona.id} style={personaStyle}>
        <div className="poster-header">
          {showsGalleryReturnControls && (
            <div className="poster-header-actions">
              <button className="back-persona-chip" onClick={onBackToGallery} type="button">
                返回人格列表
              </button>
              <button className="back-persona-chip back-persona-chip-secondary" onClick={onBackToMyResult} type="button">
                返回我的人格
              </button>
            </div>
          )}
          {!showsGalleryReturnControls && isViewingCompanionPersona && (
            <button className="back-persona-chip" onClick={() => openPersonaResult(result.primary.persona.id)} type="button">
              返回我的人格
            </button>
          )}
          <span className="source">{persona.source}</span>
        </div>

        {showsRareEasterEggBanner && <EasterEggBanner />}

        <div className="persona-heading">
          <p className="code">{persona.code}</p>
          <h1>{persona.title}——{persona.englishName}</h1>
          <h2>{persona.source}</h2>
        </div>

        <CharacterImage path={persona.imagePath} alt={`${persona.englishName} character portrait`} />

        <figure className="character-quote">
          <blockquote>{persona.characterQuote}</blockquote>
          <figcaption>{persona.englishName}</figcaption>
        </figure>

        {showsMatchBadge && (
          <div className="match-row">
            <span className="match-badge">匹配度 {result.primary.percentage}%</span>
          </div>
        )}

        {hasSupplementImages && (
          <>
            <ResultImagePair
              characterName={stillTitle}
              characterNameCn={stillTitleCn}
              sourceCn={posterTitleCn}
              posterPath={persona.posterPath ?? `/posters/${persona.source}.png`}
              source={posterTitle}
              stillPath={persona.stillPath ?? `/stills/${persona.englishName}.png`}
            />
            {persona.stillAnalysis && (
              <section className="still-analysis" aria-label="角色剖析">
                <h3>为什么是 {stillTitle}</h3>
                <p>{persona.stillAnalysis}</p>
              </section>
            )}
          </>
        )}

        <div className="character-moment">
          <h3>{persona.source === '剧场彩蛋' ? '舞台这一幕很像你' : '剧里这一幕很像你'}</h3>
          <p>{persona.characterMoment}</p>
          {(persona.momentMediaPath || persona.momentEmbedUrl) && (
            <MomentMedia
              alt={persona.momentMediaAlt ?? `${persona.source} scene clip`}
              embedUrl={persona.momentEmbedUrl}
              path={persona.momentMediaPath}
            />
          )}
        </div>

        <p className="punchline">{persona.punchline}</p>

        <div className="result-section insight-section arc-section">
          <h3>人物弧光</h3>
          <ParagraphText symbol="✦" text={persona.arc} />
        </div>

        <div className="result-section insight-section life-section">
          <h3>当代生活代入</h3>
          <ParagraphText symbol="▸" text={persona.modernLife} />
        </div>

        <div className="tag-grid">
          {result.topTraits.map((trait) => (
            <span key={trait.key}>{trait.label}</span>
          ))}
        </div>

        <div className="split-panels">
          <div>
            <h3>核心优点</h3>
            <ul>
              {persona.strengths.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3>翻车现场</h3>
            <ul>
              {persona.pitfalls.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="result-section">
          <h3>入坑推荐</h3>
          <p>{persona.recommendation}</p>
        </div>

        <ShowStillImage
          path={persona.showStillPath ?? `/show-stills/${persona.source}.png`}
          source={persona.source}
        />

        <ShowNote text={persona.shareText} />

        {!isGalleryDetailView && <RoommateCard onOpen={() => openPersonaResult(secondary.id)} persona={secondary} />}
      </article>

      {!isGalleryDetailView && (
        <div className="result-actions">
          <button className="primary-button" onClick={onReset} type="button">
            重新测一次
          </button>
          <button className="explore-button" onClick={onExplore} type="button">
            查看更多人格
          </button>
          <button className="save-button" disabled={isSaving} onClick={saveResultImage} type="button">
            {isSaving ? '正在生成图片...' : '保存结果为图片'}
          </button>
        </div>
      )}

      {savedImageUrl && (
        <div className="image-preview" role="dialog" aria-modal="true" aria-label="保存结果图片预览">
          <div className="image-preview-panel">
            <img alt="音乐剧人格结果图片预览" src={savedImageUrl} />
            <p>图片已生成。长按图片保存，或用浏览器菜单保存到相册。</p>
            <div className="image-preview-actions">
              <a download={`${persona.englishName.replace(/\s+/g, '-')}-MCTI.png`} href={savedImageUrl}>
                下载图片
              </a>
              <button onClick={closePreview} type="button">关闭</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PersonaGalleryScreen({
  onBack,
  onOpenPersona,
  onReset
}: {
  onBack: () => void;
  onOpenPersona: (personaId: string) => void;
  onReset: () => void;
}) {
  return (
    <section className="persona-gallery-screen">
      <header className="gallery-hero">
        <button className="back-persona-chip" onClick={onBack} type="button">
          返回结果
        </button>
        <p>MCTI Cast Book</p>
        <h1>音乐剧人格图鉴</h1>
        <span>15 种角色人格，含两个隐藏彩蛋。你可以慢慢翻，像在后台偷看全剧组精神状态。</span>
      </header>

      <div className="persona-gallery-grid">
        {personas.map((persona) => (
          <PersonaGalleryCard key={persona.id} onOpen={() => onOpenPersona(persona.id)} persona={persona} />
        ))}
      </div>

      <button className="primary-button gallery-reset" onClick={onReset} type="button">
        重新测一次
      </button>
    </section>
  );
}

function PersonaGalleryCard({
  onOpen,
  persona
}: {
  onOpen: () => void;
  persona: (typeof personas)[number];
}) {
  const style = createPersonaStyle(persona.accent);
  const posterTitle = persona.posterTitle ?? persona.source;
  const posterPath = persona.posterPath ?? `/posters/${persona.source}.png`;

  return (
    <button
      aria-label={`查看${persona.name}人格详情`}
      className="persona-gallery-card"
      onClick={onOpen}
      style={style}
      type="button"
    >
      <div className="gallery-card-top">
        <div>
          <span>{posterTitle}</span>
          <strong>{persona.code}</strong>
        </div>
        <img alt={`${posterTitle} poster`} src={posterPath} />
      </div>

      <div className="gallery-card-main">
        <img alt={`${persona.englishName} character portrait`} src={persona.imagePath} />
        <div>
          <h2>{persona.title}</h2>
          <p>{persona.name.replace(/^彩蛋人格：/, '')} · {persona.englishName}</p>
        </div>
      </div>

      <p className="gallery-card-line">{persona.punchline}</p>

      <div className="gallery-card-tags">
        {persona.strengths.slice(0, 3).map((strength) => (
          <span key={strength}>{strength}</span>
        ))}
      </div>
    </button>
  );
}

function createPersonaStyle(accent: string): PersonaStyle {
  const rgb = hexToRgb(accent) ?? { r: 166, g: 111, b: 63 };
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;

  return {
    '--accent': accent,
    '--accent-border': rgba(rgb, 0.34),
    '--accent-soft': rgba(rgb, 0.18),
    '--accent-faint': rgba(rgb, 0.08),
    '--accent-deep': rgbString(scaleRgb(rgb, 0.82)),
    '--accent-contrast': luminance > 0.58 ? '#2d2430' : '#fffaf2'
  };
}

async function createSharePosterBlob(result: QuizResult, roommate: QuizResult['secondary']['persona']) {
  const persona = result.primary.persona;
  const rgb = hexToRgb(persona.accent) ?? { r: 166, g: 111, b: 63 };
  const accent = persona.accent;
  const accentDeep = rgbString(scaleRgb(rgb, 0.82));
  const accentSoft = rgba(rgb, 0.16);
  const accentFaint = rgba(rgb, 0.08);
  const canvas = document.createElement('canvas');
  const scale = 2;
  const width = 390;
  const height = 690;
  canvas.width = width * scale;
  canvas.height = height * scale;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas is not supported');
  }

  context.scale(scale, scale);
  context.fillStyle = '#fbf6ef';
  context.fillRect(0, 0, width, height);
  drawRadialGlow(context, 195, 68, 150, 'rgba(255,255,255,0.96)');
  drawRadialGlow(context, 340, 610, 150, accentSoft);
  roundedRect(context, 16, 14, 358, 662, 22);
  context.fillStyle = '#fffaf4';
  context.fill();
  context.strokeStyle = rgba(rgb, 0.3);
  context.lineWidth = 1;
  context.stroke();
  drawCornerFrame(context, 28, 26, 334, 638, accentSoft);

  context.fillStyle = accentDeep;
  context.font = canvasFont(800, 13);
  context.fillText('MCTI', 48, 64);
  roundedRect(context, 266, 42, 88, 34, 18);
  context.fillStyle = accent;
  context.fill();
  context.fillStyle = getContrastColor(rgb);
  context.font = canvasFont(900, 13);
  context.textAlign = 'center';
  context.fillText(`匹配度 ${result.primary.percentage}%`, 310, 64);
  context.textAlign = 'left';

  context.fillStyle = accent;
  context.font = canvasFont(950, 44);
  drawCenteredText(context, persona.code, 195, 126);
  context.fillStyle = '#211a24';
  context.font = canvasFont(900, 19);
  drawCenteredText(context, persona.title, 195, 160);
  context.font = canvasFont(900, 27);
  drawCenteredText(context, persona.englishName, 195, 194);
  context.fillStyle = '#8a7b82';
  context.font = canvasFont(850, 15);
  drawCenteredText(context, persona.source, 195, 222);

  const mainImage = await loadCanvasImage(persona.imagePath);
  roundedRect(context, 91, 246, 208, 208, 18);
  context.fillStyle = '#fff8ef';
  context.fill();
  context.strokeStyle = rgba(rgb, 0.24);
  context.lineWidth = 1;
  context.stroke();
  drawImageCover(context, mainImage, 96, 251, 198, 198, 14);

  const quoteFontSize = persona.characterQuote.length > 42 ? 13 : 14;
  const quoteLineHeight = quoteFontSize + 6;
  context.font = canvasFont(900, quoteFontSize);
  const quoteLines = wrapCanvasText(context, persona.characterQuote, 278, 4);
  const quoteBoxHeight = Math.max(70, quoteLines.length * quoteLineHeight + 26);
  const quoteBoxY = 462;
  roundedRect(context, 35, quoteBoxY, 320, quoteBoxHeight, 14);
  context.fillStyle = 'rgba(255,250,244,0.86)';
  context.fill();
  context.strokeStyle = rgba(rgb, 0.26);
  context.stroke();
  context.fillStyle = accentDeep;
  drawWrappedLinesCentered(context, quoteLines, 195, quoteBoxY + quoteBoxHeight / 2, quoteLineHeight);

  const tagY = quoteBoxY + quoteBoxHeight + 22;
  result.topTraits.slice(0, 3).forEach((trait, index) => {
    const x = 35 + index * 108;
    roundedRect(context, x, tagY, 98, 40, 20);
    context.fillStyle = accent;
    context.fill();
    context.fillStyle = getContrastColor(rgb);
    context.font = canvasFont(900, 13);
    drawCenteredText(context, trait.label, x + 49, tagY + 25);
  });

  const roommateY = tagY + 57;
  roundedRect(context, 35, roommateY, 320, 52, 14);
  context.fillStyle = 'rgba(255,250,244,0.88)';
  context.fill();
  context.strokeStyle = rgba(rgb, 0.26);
  context.stroke();
  const roommateImage = await loadCanvasImage(roommate.imagePath);
  drawImageCover(context, roommateImage, 45, roommateY + 8, 36, 36, 9);
  context.fillStyle = '#8a7b82';
  context.font = canvasFont(800, 11);
  context.fillText('剧院精神室友', 92, roommateY + 22);
  context.fillStyle = accentDeep;
  context.font = canvasFont(900, 14);
  context.fillText(`${roommate.name} · ${roommate.code}`, 92, roommateY + 42);

  context.fillStyle = '#8a7b82';
  context.font = canvasFont(800, 10);
  drawCenteredText(context, '19 道生活小事故，测出你的音乐剧人格', 195, 681);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/png', 0.95);
  });

  if (!blob) {
    throw new Error('Empty image blob');
  }

  return blob;
}

async function loadCanvasImage(source: string) {
  const image = new Image();
  image.decoding = 'async';
  image.src = source;
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Could not load image: ${source}`));
  });
  return image;
}

function drawRadialGlow(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

function drawCornerFrame(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
  const size = 28;
  context.strokeStyle = color;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(x, y + size);
  context.lineTo(x, y);
  context.lineTo(x + size, y);
  context.moveTo(x + width - size, y);
  context.lineTo(x + width, y);
  context.lineTo(x + width, y + size);
  context.moveTo(x, y + height - size);
  context.lineTo(x, y + height);
  context.lineTo(x + size, y + height);
  context.moveTo(x + width - size, y + height);
  context.lineTo(x + width, y + height);
  context.lineTo(x + width, y + height - size);
  context.stroke();
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  context.save();
  roundedRect(context, x, y, width, height, radius);
  context.clip();
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  context.restore();
}

function drawCenteredText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
  context.save();
  context.textAlign = 'center';
  context.fillText(text, x, y);
  context.restore();
}

function drawWrappedCenteredText(
  context: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
) {
  const lines = wrapCanvasText(context, text, maxWidth, maxLines);
  const offset = ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => {
    drawCenteredText(context, line, centerX, startY - offset + index * lineHeight);
  });
}

function drawWrappedLinesCentered(
  context: CanvasRenderingContext2D,
  lines: string[],
  centerX: number,
  centerY: number,
  lineHeight: number
) {
  const offset = ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => {
    drawCenteredText(context, line, centerX, centerY - offset + index * lineHeight);
  });
}

function wrapCanvasText(context: CanvasRenderingContext2D, text: string, maxWidth: number, _maxLines?: number) {
  const characters = Array.from(text);
  const lines: string[] = [];
  let current = '';

  for (const character of characters) {
    const next = current + character;
    if (context.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = character;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function canvasFont(weight: number, size: number) {
  return `${weight} ${size}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
}

function getContrastColor(rgb: { r: number; g: number; b: number }) {
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance > 0.58 ? '#2d2430' : '#fffaf2';
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '').trim();
  if (!/^[0-9a-f]{6}$/i.test(normalized)) {
    return null;
  }

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16)
  };
}

function rgba({ r, g, b }: { r: number; g: number; b: number }, alpha: number) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rgbString({ r, g, b }: { r: number; g: number; b: number }) {
  return `rgb(${r}, ${g}, ${b})`;
}

function scaleRgb({ r, g, b }: { r: number; g: number; b: number }, factor: number) {
  return {
    r: Math.round(r * factor),
    g: Math.round(g * factor),
    b: Math.round(b * factor)
  };
}

function CharacterImage({ path, alt }: { path: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="character-image">
      {!failed && <img alt={alt} onError={() => setFailed(true)} src={path} />}
      {failed && (
        <figcaption>
          <span>角色图片位</span>
          <strong>{path}</strong>
        </figcaption>
      )}
    </figure>
  );
}

function ShowStillImage({ path, source }: { path: string; source: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={failed ? 'show-still is-empty' : 'show-still'}>
      {!failed && <img alt={`${source} production still`} onError={() => setFailed(true)} src={path} />}
      {failed && (
        <figcaption>
          <span>剧目横向剧照位</span>
          <strong>{path}</strong>
        </figcaption>
      )}
    </figure>
  );
}

function RoommateCard({
  onOpen,
  persona
}: {
  onOpen: () => void;
  persona: QuizResult['secondary']['persona'];
}) {
  return (
    <button
      aria-label={`查看${persona.name}结果页`}
      className="roommate"
      onClick={onOpen}
      type="button"
    >
      <div>
        <span>你的剧院精神室友</span>
        <strong>{persona.name} · {persona.code}</strong>
      </div>
      <img alt={`${persona.englishName} character portrait`} src={persona.imagePath} />
    </button>
  );
}

function ShowNote({ text }: { text: string }) {
  const sentences = splitIntoSentences(text);
  const closingSentence = sentences.at(-1);
  const noteSentences = sentences.slice(0, -1);

  return (
    <>
      <div className="show-note">
        {noteSentences.map((sentence, index) => (
          <p key={`${sentence}-${index}`}>
            <span aria-hidden="true">♪</span>
            {sentence}
          </p>
        ))}
      </div>
      {closingSentence && (
        <blockquote className="show-note-quote">
          {closingSentence}
        </blockquote>
      )}
    </>
  );
}

function ParagraphText({ symbol, text }: { symbol: string; text: string }) {
  return (
    <div className="paragraph-text">
      {splitIntoSentences(text).map((sentence, index) => (
        <p key={`${sentence}-${index}`}>
          <span aria-hidden="true">{symbol}</span>
          <span>{renderHighlightedSentence(sentence)}</span>
        </p>
      ))}
    </div>
  );
}

function renderHighlightedSentence(sentence: string): ReactNode {
  const range = findHighlightRange(sentence);

  if (!range) {
    return sentence;
  }

  return (
    <>
      {sentence.slice(0, range.start)}
      <mark className="text-highlight">{sentence.slice(range.start, range.end)}</mark>
      {sentence.slice(range.end)}
    </>
  );
}

function findHighlightRange(sentence: string) {
  const colonIndex = Math.max(sentence.lastIndexOf('：'), sentence.lastIndexOf(':'));
  if (colonIndex > -1 && sentence.length - colonIndex > 7) {
    return { start: colonIndex + 1, end: sentence.length };
  }

  const patterns = [
    /不是[^。！？.!?]{2,42}而是[^。！？.!?，,；;]{2,34}/,
    /不是[^。！？.!?]{2,42}只是[^。！？.!?，,；;]{2,34}/,
    /其实[^。！？.!?，,；;]{4,34}/,
    /只是[^。！？.!?，,；;]{4,34}/,
    /像[^。！？.!?，,；;]{4,34}/,
    /你身上[^。！？.!?，,；;]{4,34}/,
    /你的[^。！？.!?，,；;]{4,34}/
  ];

  for (const pattern of patterns) {
    const match = sentence.match(pattern);
    if (match?.index !== undefined) {
      return { start: match.index, end: match.index + match[0].length };
    }
  }

  return null;
}

function splitIntoSentences(text: string) {
  const sentences = text.match(/[^。.!?！？]+[。.!?！？]?/g) ?? [text];
  return sentences.map((sentence) => sentence.trim()).filter(Boolean);
}

function ResultImagePair({
  posterPath,
  stillPath,
  source,
  sourceCn,
  characterNameCn,
  characterName
}: {
  posterPath: string;
  stillPath: string;
  source: string;
  sourceCn: string;
  characterNameCn: string;
  characterName: string;
}) {
  return (
    <div className="result-image-pair">
      <SupplementImage
        alt={`${source} poster`}
        label="剧目"
        path={posterPath}
        title={`《${source}》`}
        subtitle={`《${sourceCn}》`}
      />
      <SupplementImage
        alt={`${characterName} production still`}
        label="角色定妆照"
        path={stillPath}
        title={characterName}
        subtitle={characterNameCn}
      />
    </div>
  );
}

function EasterEggBanner() {
  return (
    <div className="easter-egg-banner" aria-label="彩蛋人格提示">
      <p>恭喜你，你解锁了本次测试中最神秘、最稀有的音乐剧人格！</p>
      <div className="confetti-popper" aria-hidden="true">
        <span className="popper-cone" />
        {Array.from({ length: 9 }, (_, index) => (
          <span className="confetti-piece" key={index} />
        ))}
      </div>
    </div>
  );
}

function SupplementImage({
  path,
  alt,
  label,
  title,
  subtitle
}: {
  path: string;
  alt: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={failed ? 'supplement-image is-empty' : 'supplement-image'}>
      {!failed && <img alt={alt} onError={() => setFailed(true)} src={path} />}
      <figcaption>
        <span>{label}</span>
        <strong>{failed ? path : title}</strong>
        {!failed && subtitle && <em>{subtitle}</em>}
      </figcaption>
    </figure>
  );
}

function getSourceCn(source: string) {
  const names: Record<string, string> = {
    Hamilton: '汉密尔顿',
    Wicked: '魔法坏女巫',
    'Les Miserables': '悲惨世界',
    'The Phantom of the Opera': '歌剧魅影',
    Hadestown: '冥界',
    Chicago: '芝加哥',
    'Sweeney Todd': '理发师陶德'
  };

  return names[source] ?? source;
}

function getCharacterCn(name: string) {
  return name
    .replace(/^彩蛋人格：/, '')
    .replace(/型$/, '');
}

function MomentMedia({ path, embedUrl, alt }: { path?: string; embedUrl?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const extension = path?.split('.').pop()?.toLowerCase();
  const isVideo = extension === 'mp4' || extension === 'webm' || extension === 'mov';

  if (failed) {
    return (
      <div className="moment-media moment-media-empty">
        <span>剧情媒体位</span>
        <strong>{path ?? embedUrl}</strong>
      </div>
    );
  }

  if (!path && embedUrl) {
    return (
      <iframe
        allow="autoplay; fullscreen; picture-in-picture"
        className="moment-media moment-media-embed"
        loading="lazy"
        src={embedUrl}
        title={alt}
      />
    );
  }

  if (!path) {
    return null;
  }

  if (isVideo) {
    return (
      <video
        className="moment-media"
        controls
        muted
        onError={() => setFailed(true)}
        playsInline
        preload="metadata"
        src={path}
      />
    );
  }

  return <img alt={alt} className="moment-media" onError={() => setFailed(true)} src={path} />;
}

function IncompleteScreen({ onResume, onReset }: { onResume: () => void; onReset: () => void }) {
  return (
    <section className="incomplete-screen">
      <p className="kicker">幕布卡住了</p>
      <h1>还有一题没坐上观众席</h1>
      <p>刚才可能点得太快，系统怕把你错配成一盏应急灯，所以先把你拦下来了。</p>
      <button className="primary-button" onClick={onResume} type="button">
        补完漏掉的问题
      </button>
      <button className="ghost-button wide" onClick={onReset} type="button">
        从头再测
      </button>
    </section>
  );
}
