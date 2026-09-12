# Beyond MOS Predictors — audio demo

Static audio demo for **Beyond MOS Predictors: AudioLLM Feedback for Naturalness-Oriented TTS Reinforcement Learning**.

The page presents bilingual zero-shot TTS examples from Seed-TTS and CV3-Eval and compares five systems:

- Base
- MOS Predictor
- CER--NLL
- AudioLLM-Point
- PSIPR (Ours)

Each example includes the source speaker prompt audio and synthesized outputs for the same target sentence. Numerical scores are intentionally omitted from the listening page.

Preview locally:

```bash
cd demo
python -m http.server 8000
```

Then open `http://localhost:8000`. The directory can be deployed directly with GitHub Pages or any static web server.
