
--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `attentiondb`
--
ALTER TABLE `attentiondb`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `memorydb`
--
ALTER TABLE `memorydb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reactiondb`
--
ALTER TABLE `reactiondb`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `suprisedb`
--
ALTER TABLE `suprisedb`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `attentiondb`
--
ALTER TABLE `attentiondb`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT dla tabeli `memorydb`
--
ALTER TABLE `memorydb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT dla tabeli `reactiondb`
--
ALTER TABLE `reactiondb`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;
--
-- AUTO_INCREMENT dla tabeli `suprisedb`
--
ALTER TABLE `suprisedb`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;