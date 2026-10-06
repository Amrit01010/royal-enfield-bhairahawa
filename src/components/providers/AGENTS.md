# `src/components/providers/` instructions
- Providers wrap application-wide client contexts/integrations.
- Keep provider components small and compositional.
- Integration configuration belongs in `src/lib`; providers should consume it rather than embed secrets/configuration.
